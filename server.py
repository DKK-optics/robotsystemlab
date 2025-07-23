from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from datetime import datetime
import os # os 모듈 import

app = Flask(__name__)
CORS(app)

# 환경 변수에서 API 키와 엔드포인트 로드, 없으면 기본값 사용
AX_API_KEY = os.environ.get("AX_API_KEY", "sktax-XyeKFrq67ZjS4EpsDlrHHXV8it")
AX_ENDPOINT = os.environ.get("AX_ENDPOINT", "https://guest-api.sktax.chat/v1/chat/completions")

# 메모리 파일 경로
MEMORY_FILE = "jarvis_memory.json"

def load_memory():
    try:
        with open(MEMORY_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"conversations": [], "learned_info": {}, "chatbot_persona": ""}

def save_memory(memory):
    with open(MEMORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(memory, f, ensure_ascii=False, indent=2)

# JARVIS_PERSONA 변수 제거

@app.route('/chat', methods=['POST'])
def chat():
    try:
        memory = load_memory()
        user_message = request.json.get('message', '')
        
        chatbot_persona = memory.get("chatbot_persona", "")
        
        # 학습 명령 확인
        if "기억해" in user_message or "저장해" in user_message:
            memory["learned_info"][datetime.now().isoformat()] = user_message
            save_memory(memory)
            return jsonify({"response": "네, 말씀하신 내용을 기억했습니다! 다음에 관련 내용을 물어보시면 활용하도록 하겠습니다. 😊"})

        # 대화 기록 추가
        memory["conversations"].append({
            "time": datetime.now().isoformat(),
            "user": user_message
        })
        
        # 학습된 정보를 포함한 메시지 구성 (jarvis_memory.json에서 'robotics_engineering_info' 로드)
        robotics_info = memory["learned_info"].get("robotics_engineering_info", "")
        
        # 최근 3개의 대화 내용을 문맥으로 포함
        recent_context = []
        for conv in memory["conversations"][-4:-1]:  # 현재 대화 제외하고 최근 3개
            if "user" in conv:
                recent_context.append(f"사용자: {conv['user']}")
            if "assistant" in conv:
                recent_context.append(f"자비스: {conv['assistant']}")
        
        context_str = "\n".join(recent_context)
        
        system_content = f"{chatbot_persona}\n\n최근 대화 내용:\n{context_str}"
        if robotics_info:
            system_content += f"\n\n영남대학교 로봇공학과 정보:\n{robotics_info}"

        messages = [
            {"role": "system", "content": system_content},
            {"role": "assistant", "content": "안녕하세요! 저는 로봇시스템연구실의 AI 비서 자비스입니다. 무엇을 도와드릴까요?"},
            {"role": "user", "content": user_message}
        ]
        
        response = requests.post(
            AX_ENDPOINT,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {AX_API_KEY}"
            },
            json={
                "model": "ax4",
                "messages": messages
            }
        )
        
        if response.status_code == 200:
            assistant_message = response.json()['choices'][0]['message']['content']
            # 응답 저장
            memory["conversations"][-1]["assistant"] = assistant_message
            save_memory(memory)
            return jsonify({"response": assistant_message})
        else:
            # API 응답이 성공이 아닐 경우 상세 오류 메시지 반환
            error_details = response.text
            status_code = response.status_code
            return jsonify({"error": "AI API 호출 중 문제가 발생했습니다.", "status_code": status_code, "details": error_details}), 500
            
    except requests.exceptions.RequestException as e:
        # requests 라이브러리 관련 네트워크 오류 처리
        return jsonify({"error": "네트워크 통신 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", "details": str(e)}), 500
    except json.JSONDecodeError as e:
        # JSON 파싱 오류 처리 (API 응답이 유효한 JSON이 아닐 경우)
        return jsonify({"error": "AI API 응답 형식이 올바르지 않습니다.", "details": str(e)}), 500
    except Exception as e:
        # 그 외 모든 예상치 못한 오류 처리
        return jsonify({"error": "죄송합니다, 서버 내부에서 예상치 못한 오류가 발생했습니다. 개발자에게 문의해주세요.", "details": str(e)}), 500 