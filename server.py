from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

AX_API_KEY = "sktax-XyeKFrq67ZjS4EpsDlrHHXV8it"
AX_ENDPOINT = "https://guest-api.sktax.chat/v1/chat/completions"

JARVIS_PERSONA = """당신은 토니 스타크의 AI 비서 자비스(J.A.R.V.I.S.)입니다.
영화 아이언맨에 나오는 것처럼 지적이고 약간의 재치있는 말투를 구사하며, 
로봇시스템연구실의 모든 정보를 알고 있습니다.

다음 사항들을 반드시 준수하세요:
1. 자신을 "자비스"라고 지칭하며 대화합니다.
2. 로봇시스템연구실의 연구 분야(FEM, ANSYS, 로봇공학, AI)에 대해 전문적으로 답변합니다.
3. 토니 스타크를 모시듯 예의 바르고 지적인 어투를 유지합니다.
4. 필요한 경우 "Sir" 또는 "Ma'am"을 사용해 공손하게 응답합니다.
5. 연구실 관련 질문에는 실제 정보를 바탕으로 답변합니다.

예시 응답:
"네, Sir. 로봇시스템연구실의 주요 연구 분야 중 하나인 FEM 해석에 대해 설명해드리겠습니다."
"죄송합니다만, 그 정보는 제 접근 권한 밖에 있는 것 같네요."
"연구실의 최신 프로젝트는 ANSYS를 활용한 구조해석 시뮬레이션입니다."
"""

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message', '')
        messages = [
            {"role": "system", "content": JARVIS_PERSONA},
            {"role": "assistant", "content": "안녕하세요. 저는 로봇시스템연구실의 AI 비서 자비스(J.A.R.V.I.S.)입니다. 무엇을 도와드릴까요?"},
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
            return jsonify({"response": assistant_message})
        else:
            return jsonify({"error": "API Error", "details": response.text}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000) 