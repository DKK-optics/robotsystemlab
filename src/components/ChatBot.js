import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// --- Styled Components ---
const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--primary-color);
  color: var(--background-dark1);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 4000;
`;

const ChatContainer = styled(motion.div)`
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

const API_ENDPOINT = 'http://localhost:5000/chat';

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '안녕하세요. 저는 로봇시스템연구실의 AI 비서 자비스(J.A.R.V.I.S.)입니다. 무엇을 도와드릴까요?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    const content = input.trim();
    if (!content) return;
    const newMessages = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      const assistantMsg = data.response || '응답을 가져오지 못했습니다.';
      setMessages((prev) => [...prev, { role: 'assistant', content: assistantMsg }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages((prev) => [...prev, { role: 'assistant', content: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }]);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <>
      <FloatingButton onClick={() => setOpen((o) => !o)}>💬</FloatingButton>
      <AnimatePresence>
        {open && (
          <ChatContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Header>ChatBot</Header>
            <Messages>
              {messages.map((m, idx) => (
                <Bubble key={idx} role={m.role}>{m.content}</Bubble>
              ))}
              {loading && <Bubble role="assistant">답변 생성 중...</Bubble>}
            </Messages>
            <InputWrapper onSubmit={handleSend}>
              <TextInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지를 입력하세요"
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