import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components'; // css 임포트 추가
import { motion, AnimatePresence } from 'framer-motion';

// --- Styled Components ---
const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #1a1a1a;
  border: 2px solid #00bcd4;
  cursor: pointer;
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 188, 212, 0.5);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background: radial-gradient(circle, #00bcd4 0%, transparent 70%);
    opacity: 0.5;
    animation: pulse 2s infinite;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 35px rgba(0, 188, 212, 1); // 더 강한 네온 효과
    border-color: #fff;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
  }

  img {
    width: 35px;
    height: 35px;
    z-index: 1;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: rotate(180deg);
  }
`;

const neonRotate = keyframes`
  0% {
    border-color: #00bcd4; /* Cyan */
    box-shadow: 0 0 15px #00bcd4, 0 0 25px #00bcd4, inset 0 0 15px #00bcd4;
  }
  25% {
    border-color: #00aacc; /* Lighter Cyan */
    box-shadow: 0 0 20px #00aacc, 0 0 35px #00aacc, inset 0 0 20px #00aacc;
  }
  50% {
    border-color: #00bcd4; /* Cyan */
    box-shadow: 0 0 15px #00bcd4, 0 0 25px #00bcd4, inset 0 0 15px #00bcd4;
  }
  75% {
    border-color: #00aacc; /* Lighter Cyan */
    box-shadow: 0 0 20px #00aacc, 0 0 35px #00aacc, inset 0 0 20px #00aacc;
  }
  100% {
    border-color: #00bcd4; /* Cyan */
    box-shadow: 0 0 15px #00bcd4, 0 0 25px #00bcd4, inset 0 0 15px #00bcd4;
  }
`;

const ChatContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['isChatLoading'].includes(prop),
})`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 320px;
  max-height: 500px;
  background: var(--background-dark2);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 4000;
  border: 2px solid transparent; /* 기본 테두리 */
  ${({ isChatLoading }) =>
    isChatLoading &&
    css` /* 여기에 css 헬퍼 추가 */
      animation: ${neonRotate} 1.5s infinite alternate; /* 부드러운 네온 애니메이션 */
      box-shadow: 0 0 20px rgba(0, 188, 212, 0.7); /* 로딩 시 그림자 강화 */
    `}
`;

const Header = styled.div`
  background: var(--background-dark1);
  padding: 10px;
  text-align: center;
  font-weight: 600;
`;

const Messages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  scroll-behavior: smooth;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--background-dark1);
  }

  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const InputWrapper = styled.form`
  display: flex;
  border-top: 1px solid var(--background-dark1);
`;

const TextInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  padding: 10px;
  color: var(--text-color);
  &:focus { outline: none; }
`;

const SendButton = styled.button`
  background: var(--primary-color);
  border: none;
  padding: 0 15px;
  cursor: pointer;
`;

const Bubble = styled.div`
  background: ${({ role }) => (role === 'user' ? '#2e2e2e' : '#444')};
  color: var(--text-color);
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  align-self: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
  max-width: 80%;
  white-space: pre-line;
`;

const API_ENDPOINT = 'http://localhost:5000/chat'; // 로컬 Flask 앱 URL로 변경 (테스트용)

const personData = {
  '김대근': {
    role: '학부연구생',
    details: 'Optics, Automotive AI 분야를 연구하고 있습니다. GPT 스터디 그룹, Phocus Camera/Vision 팀 활동 경력이 있습니다. 🚀',
  },
  '정효영': {
    role: '학부연구생',
    details: 'FEM, Defense Industry 분야를 연구하고 있습니다. CAE 스터디 팀 활동 경력이 있습니다. ✨',
  },
  '이동연': {
    role: '교수님',
    details: '로봇시스템연구실의 교수님으로, AI·로봇공학·미디어 기술 융합 연구를 이끌고 계십니다. 👨‍🔬',
  },
};

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '안녕하십니까, 사용자님. 저는 J.A.R.V.I.S.입니다. 무엇을 도와드릴까요? ✨' } // J.A.R.V.I.S. 스타일로 변경
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isChatLoading, setIsChatLoading] = useState(false); // 로딩 상태 이름 변경

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // 메시지가 추가될 때마다 스크롤

  const handleSend = async (e) => {
    e.preventDefault();
    const content = input.trim();
    if (!content) return;
    const newMessages = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setIsChatLoading(true); // 메시지 전송 시작 시 로딩 상태 활성화

    let assistantMsg = '';

    // 인물 정보 요청 처리
    const nameQuery = Object.keys(personData).find(name => content.includes(name));
    if (nameQuery) {
      const person = personData[nameQuery];
      assistantMsg = `${nameQuery}님은 ${person.role}입니다. 주요 연구 분야는 ${person.details} 어떠신가요? 🤔`;
      setMessages((prev) => [...prev, { role: 'assistant', content: assistantMsg }]);
      setLoading(false);
      setIsChatLoading(false); // 응답 수신 또는 오류 발생 시 로딩 상태 비활성화
      return;
    }

    // 일반적인 질문 처리
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error response:", errorData);
        throw new Error(`HTTP ${response.status}: ${errorData.error || '알 수 없는 오류'}. ${errorData.details || ''}`);
      }

      const data = await response.json();
      let rawAssistantMsg = data.response || '응답을 가져오지 못했습니다. 😔';
      
      // 'sir' 단어 대체 및 이모티콘 추가
      rawAssistantMsg = rawAssistantMsg.replace(/sir|Sir/g, '사용자님');

      // 간단한 규칙 기반으로 이모티콘 추가
      if (rawAssistantMsg.includes('안녕하세요') || rawAssistantMsg.includes('안녕')) {
        assistantMsg = rawAssistantMsg + ' 👋';
      } else if (rawAssistantMsg.includes('무엇을') || rawAssistantMsg.includes('어떻게')) {
        assistantMsg = rawAssistantMsg + ' 💡';
      } else if (rawAssistantMsg.includes('감사') || rawAssistantMsg.includes('고마워')) {
        assistantMsg = rawAssistantMsg + ' 😊';
      } else {
        assistantMsg = rawAssistantMsg + ' 💬';
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: assistantMsg }]);
    } catch (err) {
      console.error('Error:', err);
      let errorMessage = '오류가 발생했습니다. 잠시 후 다시 시도해주세요. 🛠️';
      if (err.message.includes('보안 프로그램 DK-VAULT가 DDOS 방지를 위해 작동합니다.')) {
        errorMessage = '보안 프로그램 DK-VAULT가 DDOS 방지를 위해 작동합니다. 잠시 후 다시 시도해주세요.';
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: errorMessage }]);
    } finally {
      setLoading(false);
      setIsChatLoading(false); // 응답 수신 또는 오류 발생 시 로딩 상태 비활성화
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.7 }, // 시작 시 더 아래에서 작게
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 15, stiffness: 120 } }, // 스프링 효과
    exit: { opacity: 0, y: 100, scale: 0.7, transition: { duration: 0.3 } },
  };

  return (
    <>
      <FloatingButton onClick={() => setOpen((o) => !o)}>
        <img src={process.env.PUBLIC_URL + '/images/arc-reactor.svg'} alt="JARVIS" />
      </FloatingButton>
      <AnimatePresence>
        {open && (
          <ChatContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            isChatLoading={isChatLoading} // isChatLoading prop 전달
          >
            <Header>로봇시스템연구실 AI 비서 자비스</Header>
            <Messages>
              {messages.map((m, idx) => (
                <Bubble key={idx} role={m.role}>{m.content}</Bubble>
              ))}
              {loading && <Bubble role="assistant">답변 생성 중...</Bubble>}
              <div ref={messagesEndRef} />
            </Messages>
            <InputWrapper onSubmit={handleSend}>
              <TextInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지를 입력하세요"
                disabled={isChatLoading} // 로딩 중에는 입력 비활성화
              />
              <SendButton type="submit">➡</SendButton>
            </InputWrapper>
          </ChatContainer>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatBot; 