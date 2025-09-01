from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

# .env에서 API Key 가져오기 (이제 직접 사용)
AX_API_KEY = "sktax-XyeKFrq67ZjS4EpsDlrHHXV8it"
AX_API_URL = "https://api.skt.com/aix/v1/chat/completions"

LOCAL_LLM_URL = "http://localhost:11434/api/generate"

def is_ansys_related(query: str) -> bool:
    ansys_keywords = [
        "ansys", "explicit", "dynamics", "mesh", "해석",
        "시간 증가량", "경계조건", "BFD", "충돌", "논문"
    ]
    return any(kw.lower() in query.lower() for kw in ansys_keywords)

def ask_ax_api(query: str) -> str:
    headers = {"Authorization": f"Bearer {AX_API_KEY}"}
    payload = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": query}]
    }
    try:
        r = requests.post(AX_API_URL, headers=headers, json=payload, timeout=30)
        r.raise_for_status()
        return r.json()["choices"][0]["message"]["content"]
    except Exception as e:
        return f"⚠️ A.X API 오류: {e}"

def ask_local_llm(query: str, context: str = "") -> str:
    prompt = f"""
너는 ANSYS 해석 전문가 Copilot이다.
사용자가 질문하면 반드시 아래 포맷으로 답해라:

✅ 추천:
[한 줄 요약된 해결책]

📖 설명:
[왜 이 조치가 필요한지, ANSYS 원리 기반 설명]

🔗 출처:
[ANSYS 공식문서, 태성 S&E, 논문 출처 표시]

---
질문: {query}
참고 문서: {context}
"""
    try:
        payload = {"model": "mistral", "prompt": prompt}
        r = requests.post(LOCAL_LLM_URL, json=payload, timeout=60)
        r.raise_for_status()
        return r.json().get("response", "").strip()
    except Exception as e:
        return f"⚠️ 로컬 LLM 오류: {e}"

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    query = data.get("query", "")

    if not query:
        return jsonify({"error": "No query provided"}), 400

    if is_ansys_related(query):
        answer = ask_local_llm(query)
    else:
        answer = ask_ax_api(query)

    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
