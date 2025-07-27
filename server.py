from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from datetime import datetime
import os

app = Flask(__name__)
# 모든 출처에서의 요청을 허용하고, JSON 응답 시 ASCII 인코딩을 비활성화하여 한글이 깨지지 않도록 설정합니다.
CORS(app)
app.config['JSON_AS_ASCII'] = False


# --- 설정 (Configuration) ---

# 환경 변수에서 API 키와 엔드포인트 로드
# 중요: 실제 배포 환경에서는 보안을 위해 반드시 환경 변수를 사용해야 합니다.
# os.environ.get의 두 번째 인자는 환경 변수가 없을 경우 사용할 '기본값'입니다.
# 사용자님의 키를 기본값으로 설정하고, 올바른 환경 변수 이름(ADOTX_API_KEY)으로 수정했습니다.
ADOTX_API_KEY = os.environ.get("ADOTX_API_KEY", "sktax-XyeKFrq67ZjS4EpsDlrHHXV8it")
AX_ENDPOINT = os.environ.get("AX_ENDPOINT", "https://guest-api.sktax.chat/v1/chat/completions")

# 대화 내용 및 학습 정보를 저장할 파일 경로
MEMORY_FILE = "jarvis_memory.json"

# --- 메모리 관리 (Memory Management) ---

def load_memory():
    """JSON 파일에서 메모리를 불러옵니다."""
    try:
        with open(MEMORY_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        # 파일이 없거나 JSON 형식이 잘못된 경우 초기화된 메모리 구조를 반환합니다.
        return {"conversations": [], "learned_info": {}, "chatbot_persona": "You are a helpful AI assistant."}

def save_memory(memory):
    """메모리를 JSON 파일에 저장합니다."""
    with open(MEMORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(memory, f, ensure_ascii=False, indent=4)

# --- 라우트 및 핵심 로직 (Routes & Core Logic) ---

@app.route('/chat', methods=['POST'])
def chat():
    """챗봇 응답을 처리하는 메인 함수"""
    # API 키가 설정되지 않았을 경우 오류를 반환하여 문제를 명확히 합니다.
    if not ADOTX_API_KEY or ADOTX_API_KEY == "YOUR_API_KEY_HERE":
        return jsonify({
            "error": "서버에 API 키가 설정되지 않았습니다. 환경 변수를 확인해주세요."
        }), 500
        
    try:
        memory = load_memory()
        user_message = request.json.get('message', '').strip()

        if not user_message:
            return jsonify({"error": "메시지가 비어있습니다."}), 400

        # --- 특수 명령어 처리 ---
        if user_message in ["새 대화", "리셋", "대화 초기화"]:
            memory["conversations"] = []
            save_memory(memory)
            return jsonify({"response": "네, 새로운 대화를 시작하겠습니다. 무엇을 도와드릴까요? ✨"})

        if "기억해:" in user_message or "학습해:" in user_message:
            try:
                command, content = user_message.split(':', 1)
                keyword, data = content.strip().split(' ', 1)
                memory["learned_info"][keyword.strip()] = data.strip()
                save_memory(memory)
                response_message = f"네, '{keyword}'에 대한 정보를 기억했습니다! 🤖"
            except ValueError:
                response_message = "학습 형식이 잘못되었습니다. '기억해: [키워드] [내용]' 형식으로 입력해주세요."
            return jsonify({"response": response_message})

        # --- 일반 대화 처리 ---
        chatbot_persona = memory.get("chatbot_persona", "You are a helpful AI assistant.")
        learned_info_str = "\n".join([f"- {key}: {value}" for key, value in memory["learned_info"].items()])
        
        system_content = f"{chatbot_persona}"
        if learned_info_str:
            system_content += f"\n\n[학습된 정보]\n{learned_info_str}"

        messages = [{"role": "system", "content": system_content}]
        messages.extend(memory.get("conversations", []))
        messages.append({"role": "user", "content": user_message})

        # API 호출
        api_response = requests.post(
            AX_ENDPOINT,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {ADOTX_API_KEY}"
            },
            json={
                "model": "ax4",
                "messages": messages
            },
            timeout=30
        )
        api_response.raise_for_status()

        # 응답 처리
        response_data = api_response.json()
        assistant_message = response_data['choices'][0]['message']['content']
        
        assistant_message = assistant_message.replace('톳', ' ').replace('톳은', ' ').replace('톳을', ' ').replace('톳이', ' ').replace('톳과', ' ')

        memory["conversations"].append({"role": "user", "content": user_message})
        memory["conversations"].append({"role": "assistant", "content": assistant_message})
        memory["conversations"] = memory["conversations"][-20:]
        
        save_memory(memory)
        
        return jsonify({"response": assistant_message})

    # --- 예외 처리 ---
    except requests.exceptions.HTTPError as e:
        # API 서버에서 받은 오류 응답을 더 자세히 로깅하고 클라이언트에게 전달
        error_content = e.response.text
        print(f"API Error Response: {error_content}") # 서버 로그에 상세 내용 출력
        return jsonify({
            "error": "AI API에서 오류가 발생했습니다.", 
            "status_code": e.response.status_code, 
            "details": error_content
        }), 500
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "네트워크 통신 중 오류가 발생했습니다.", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "서버 내부에서 예상치 못한 오류가 발생했습니다.", "details": str(e)}), 500

if __name__ == '__main__':
    # --- 개발용 서버 실행 (Development Server) ---
    # 아래 app.run에서 debug=True 옵션은 코드가 변경될 때마다 
    # 서버를 자동으로 재시작해주는 기능(auto-reloader)을 포함하고 있습니다.
    # 개발 중에는 터미널에서 'python app.py' 명령어로 실행하는 것이 편리합니다.
    app.run(host='0.0.0.0', port=5000, debug=True)

    # --- 운영용 서버 실행 (Production Server Guide) ---
    # 실제 서비스를 배포할 때는 Flask에 내장된 개발용 서버 대신 Gunicorn과 같은
    # WSGI (Web Server Gateway Interface) 서버를 사용하는 것이 안정성과 성능 면에서 권장됩니다.
    # Gunicorn은 프로세스가 예기치 않게 종료되면 자동으로 재시작해주는 기능도 제공합니다.
    #
    # 1. Gunicorn 설치 (터미널에서 실행):
    # pip install gunicorn
    #
    # 2. Gunicorn으로 서버 실행 (개발 시 자동 재시작 기능 포함, 터미널에서 실행):
    # gunicorn --bind 0.0.0.0:5000 --reload app:app
    #
    # 3. Gunicorn으로 서버 실행 (실제 배포용, 워커 4개 사용, 터미널에서 실행):
    # gunicorn --bind 0.0.0.0:5000 --workers 4 app:app
    #
    # 위 명령어들은 이 스크립트 파일(app.py)이 있는 폴더의 터미널에서 실행해야 합니다.
    # Gunicorn을 사용해 서버를 실행할 경우, 위의 app.run() 코드는 무시됩니다.
