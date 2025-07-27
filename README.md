# Robot System Lab Chatbot Project

이 프로젝트는 Flask 기반의 백엔드와 React 기반의 프론트엔드로 구성된 챗봇 애플리케이션입니다.

## 🚀 시작하기

### 필수 요구사항

프로젝트를 로컬에서 실행하기 위해서는 다음이 설치되어 있어야 합니다:

-   **Python 3.8+** (requirements.txt에 명시된 의존성 호환)
-   **Node.js 18+**
-   **npm (Node.js와 함께 설치됩니다)**

### 로컬 환경 설정 및 실행

#### 1. 프로젝트 클론 (GitHub에서 새로 클론하는 경우)

```bash
git clone https://github.com/DKK-optics/robotsystemlab.git
cd robotsystemlab
```

#### 2. 의존성 설치

**백엔드 (Python):**

프로젝트 루트에서 다음 명령어를 실행하여 Python 의존성을 설치합니다:

```bash
pip install -r requirements.txt
```

**프론트엔드 (React):**

프로젝트 루트에서 다음 명령어를 실행하여 Node.js 의존성을 설치합니다:

```bash
npm install
```

#### 3. 환경 변수 설정 (.env 파일)

프로젝트 루트 디렉토리 (`robotsystemlab/`)에 `.env` 파일을 생성하고 다음 내용을 추가합니다. 이 파일은 민감한 정보를 포함하므로 Git에 의해 추적되지 않습니다 (`.gitignore`에 명시됨).

```
ADOTX_API_KEY="여기에 실제 SKTAI API 키를 입력하세요"
HOST=localhost
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

-   `ADOTX_API_KEY`: SKTAI 챗봇 API 사용을 위한 인증 키입니다.
-   `HOST=localhost`: React 개발 서버가 로컬에서 올바르게 바인딩되도록 합니다.
-   `DANGEROUSLY_DISABLE_HOST_CHECK=true`: 개발 서버의 호스트 검사를 비활성화하여 특정 환경에서의 연결 문제를 방지합니다.

#### 4. 애플리케이션 실행

**두 개의 별도 터미널 창**을 열어 백엔드와 프론트엔드 서버를 각각 실행해야 합니다.

**첫 번째 터미널 (백엔드 서버):**

`C:\robotsystemlab` 경로에 있는지 확인한 후, 다음 명령을 실행합니다:

```powershell
$env:ADOTX_API_KEY="[고객님의 API 키]"; python app.py
```
*   `[고객님의 API 키]` 부분에 실제 `ADOTX_API_KEY` 값을 넣어주세요.
*   이 터미널은 백엔드 서버가 실행되는 동안 계속 열어두셔야 합니다. `[DEBUG] ADOTX_API_KEY: [고객님의 API 키]` 및 `* Serving Flask app 'app'` 메시지가 보이면 성공입니다.

**두 번째 터미널 (프론트엔드 개발 서버):**

새로운 터미널 창을 열고 `C:\robotsystemlab` 경로로 이동한 후, 다음 명령어를 실행합니다:

```powershell
npm start
```
*   이 터미널은 개발 서버가 실행되는 동안 계속 열어두셔야 합니다.
*   개발 서버가 성공적으로 시작되면 웹 브라우저가 자동으로 `http://localhost:3000`으로 열리거나, 해당 URL로 직접 접속할 수 있습니다.

## ☁️ 배포

이 프로젝트는 Heroku에 배포될 수 있도록 구성되어 있습니다. `git push heroku main` 명령을 사용하여 Heroku에 배포할 수 있습니다.

**Heroku 배포 URL:** `https://jarvisrobotsystemlab-e61b9374168c.herokuapp.com/`

---

이 `README.md` 파일은 프로젝트를 시작하고 실행하는 데 필요한 모든 정보를 제공합니다. 