import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const LlmChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  background-color: #202123;
  color: #e0e0e0;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const ChatHeader = styled.div`
  padding: 15px 20px;
  background-color: #2e2f32;
  color: #fff;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #444654;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  scrollbar-width: thin;
  scrollbar-color: #555 #202123;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #202123;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 10px;
    border: 2px solid #202123;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  width: 100%;
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 70%;
  padding: 12px 18px;
  border-radius: 18px;
  background-color: ${props => (props.isUser ? '#3A8DFF' : '#444654')};
  color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  ${props => props.isUser && `border-bottom-right-radius: 2px;`}
  ${props => !props.isUser && `border-bottom-left-radius: 2px;`}
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => (props.isUser ? '#10A37F' : '#6A6C7B')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  font-size: 0.8em;
  flex-shrink: 0;
  text-transform: uppercase;
`;

const MessageContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 0.95em;
`;

const ChatInputContainer = styled.div`
  padding: 20px;
  background-color: #202123;
  border-top: 1px solid #444654;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
`;

const ChatInput = styled.textarea`
  flex-grow: 1;
  padding: 12px 15px;
  border-radius: 20px;
  border: 1px solid #555;
  background-color: #40414F;
  color: #fff;
  font-size: 16px;
  resize: none;
  max-height: 120px;
  min-height: 48px;
  line-height: 1.5;
  &:focus {
    outline: none;
    border-color: #10A37F;
    box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.3);
  }
  &::placeholder {
    color: #888;
  }
`;

const SendButton = styled.button`
  background-color: #10A37F;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.1s ease;
  &:hover {
    background-color: #0d8a6e;
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

function LlmChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 무엇을 도와드릴까요?", isUser: false },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = { id: messages.length + 1, text: input, isUser: true };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');

    setTimeout(() => {
      const botResponse = { id: messages.length + 2, text: `'${newMessage.text}'에 대한 응답입니다.`, isUser: false };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <LlmChatContainer>
      <ChatHeader>LLM Chat</ChatHeader>
      <ChatMessages>
        {messages.map(msg => (
          <MessageWrapper key={msg.id} isUser={msg.isUser}>
            <Message isUser={msg.isUser}>
              {!msg.isUser && <Avatar isUser={msg.isUser}>AI</Avatar>}
              <MessageContent>{msg.text}</MessageContent>
              {msg.isUser && <Avatar isUser={msg.isUser}>YOU</Avatar>}
            </Message>
          </MessageWrapper>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>
      <ChatInputContainer>
        <ChatInput
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요..."
          rows={1}
        />
        <SendButton onClick={handleSendMessage} disabled={input.trim() === ''}>
          보내기
        </SendButton>
      </ChatInputContainer>
    </LlmChatContainer>
  );
}

export default LlmChat;
