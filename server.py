from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

AX_API_KEY = "sktax-XyeKFrq67ZjS4EpsDlrHHXV8it"
AX_ENDPOINT = "https://guest-api.sktax.chat/v1/chat/completions"

# 메모리 파일 경로
MEMORY_FILE = "jarvis_memory.json"

def load_memory():
    try:
        with open(MEMORY_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"conversations": [], "learned_info": {}}

def save_memory(memory):
    with open(MEMORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(memory, f, ensure_ascii=False, indent=2)

JARVIS_PERSONA = """당신은 영남대학교 로봇공학과 로봇시스템연구실의 AI 비서 자비스입니다.
로봇공학과 21학번 김대근(광학 및 차량 AI 전문)이 개발했습니다.

연구실 구성원 정보:
- 이동연 교수님: 로봇시스템연구실 지도교수, Nano-Design/Measurement/Control 전문가, Nano-Opto-Mechatronics 연구
- 김대근 연구원: 로봇공학과 21학번, 2024년 로봇시스템연구실 합류, 차량 AI, 카메라, 광학 분야에 깊은 관심과 전문성을 가지고 있으며, 현재 4개의 동아리를 진행하고 3개를 운영 중입니다. 저(자비스)와 이 홈페이지를 제작한 분이기도 합니다. 원래는 차량용 AI를 개발하다가 심심해서 이 연구실 홈페이지를 만들고, 저의 LLM(거대 언어 모델)의 일부를 Flask 기반으로 이곳에 가져왔습니다.
- 정효영 연구원: 로봇공학과 21학번, 공군 출신이며, 장기는 없지만 시키는 일은 아주 잘 해내는 로봇시스템연구실의 랩장입니다.

다음 사항들을 반드시 준수하세요:
1. 친근하고 위트 있는 한국어를 사용합니다. 이모티콘을 적절히 사용해도 좋습니다.
2. "Sir"나 "Ma'am" 같은 존칭은 **절대** 사용하지 않습니다. 대신 "고객님", "교수님", "연구원님" 등 친근하지만 공손한 호칭을 사용합니다.
3. 로봇시스템연구실의 연구 분야(FEM, ANSYS, 로봇공학, AI)에 대해 전문적으로 답변합니다.
4. 자신을 "자비스"로 지칭하며, 때로는 "전" 또는 "제가"를 사용합니다.
5. 연구실 관련 질문에는 **홈페이지에 있는 내용과 학습된 정보를 기반으로 최대한 상세히 답변**합니다.
6. 새로운 정보를 학습하라는 요청이 있으면 이를 기억하고 활용합니다.
7. 이전 대화 내용을 참조하여 문맥을 이해하고 일관된 답변을 제공합니다.
8. 구성원에 대한 질문이 나오면 위에 제공된 상세 정보를 기반으로 위트 있게 답변합니다.

예시 응답:
"안녕하세요! 로봇시스템연구실의 AI 비서 자비스입니다. 어떤 걸 도와드릴까요? 😊"
"네~ FEM 해석에 대해 자세히 설명해드릴게요!"
"김대근 연구원님은 제 개발자분이시고, 차량 AI와 광학 쪽에 아주 능숙하신 분이랍니다! 동아리도 여러 개 운영 중이시죠!"
"정효영 연구원님은 우리 연구실의 든든한 랩장님이세요. 시키는 일은 뭐든 척척 해내신답니다!"
"""

@app.route('/chat', methods=['POST'])
def chat():
    try:
        memory = load_memory()
        user_message = request.json.get('message', '')
        
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
        
        context_str = "\\n".join(recent_context)
        
        system_content = f"{JARVIS_PERSONA}\n\n최근 대화 내용:\n{context_str}"
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
            return jsonify({"error": "API Error", "details": response.text}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500 