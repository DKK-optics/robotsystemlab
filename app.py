from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os
from dotenv import load_dotenv
import logging
from datetime import datetime
import requests

# .env 파일에서 환경 변수 로드
load_dotenv()

app = Flask(__name__)

# Rate Limiter 설정 (IP당 분당 5회 요청 제한)
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["5 per minute"]
)

# 로깅 설정
# chatbot.log 파일에 IP와 메시지를 기록합니다.
log_file = "chatbot.log"
logging.basicConfig(filename=log_file, level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

# API 키 및 타사 API 엔드포인트 로드 (환경 변수에서)
SKT_API_KEY = os.getenv("SKT_API_KEY")
THIRD_PARTY_API_ENDPOINT = os.getenv("THIRD_PARTY_API_ENDPOINT", "https://guest-api.sktax.chat/v1/chat/completions") # 실제 사용하실 SKT API 엔드포인트

if not SKT_API_KEY:
    logging.error("SKT_API_KEY environment variable not set.")
    # 실제 배포 시에는 API 키가 없으면 앱을 시작하지 않거나 경고를 발생시키는 로직 추가 필요
if not THIRD_PARTY_API_ENDPOINT:
    logging.error("THIRD_PARTY_API_ENDPOINT environment variable not set.")

@app.route('/chat', methods=['POST'])
def chat():
    client_ip = get_remote_address()
    logging.info(f"Request received from IP: {client_ip}")

    try:
        data = request.get_json()
        if not data or 'message' not in data:
            logging.warning(f"Invalid request from IP: {client_ip} - Missing 'message' in JSON")
            return jsonify({"error": "Invalid JSON format: 'message' key missing"}), 400

        user_message = data['message']
        logging.info(f"Message from {client_ip}: {user_message}")

        # API 키 보호: 클라이언트에게 API 키를 절대로 보내지 않습니다.
        # 서버에서만 API 키를 사용하여 타사 API를 호출합니다.
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {SKT_API_KEY}" # 서버에서만 사용
        }
        payload = {
            "message": user_message
        }

        # 타사 API로 메시지 전달
        response = requests.post(THIRD_PARTY_API_ENDPOINT, headers=headers, json=payload)
        response.raise_for_status() # HTTP 오류가 발생하면 예외 발생

        # 타사 API의 응답을 클라이언트에게 반환 (안전하게 result 키 사용)
        third_party_response = response.json().get("result", "No response from third-party API.")
        
        logging.info(f"Response to {client_ip}: {third_party_response}")
        return jsonify({"response": third_party_response}), 200

    except requests.exceptions.RequestException as e:
        logging.error(f"Third-party API request failed for IP: {client_ip} - {e}")
        return jsonify({"error": f"Failed to connect to third-party API: {str(e)}"}), 500
    except Exception as e:
        logging.error(f"Server internal error for IP: {client_ip} - {e}")
        return jsonify({"error": f"An internal server error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    # 로컬 개발 환경에서만 실행 (Heroku 배포 시에는 gunicorn이 실행)
    app.run(debug=True, host='0.0.0.0', port=os.getenv('PORT', 5000)) 