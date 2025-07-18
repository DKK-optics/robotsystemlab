import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroSection = styled.section`
  height: 100vh;
  background: 
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/images/space.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  /* GlobalStyle의 .container와 동일한 규칙 적용 */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  
  /* 내부 요소를 Flexbox로 제어 */
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeroContent = styled.div`
  /* HeroContent가 남는 공간을 차지하지 않도록 설정 */
  flex-shrink: 0; 
  max-width: 800px;
  text-align: center;
  
  h5 {
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 4px;
    color: var(--text-color-muted);
    animation: ${fadeIn} 1s ease-out 0.5s both;
  }

  h1 {
    font-family: 'Cascadia Code', monospace;
    font-size: clamp(3rem, 10vw, 5.5rem);
    font-weight: 400; /* 폰트 두께를 얇게 조정 (기본값보다 낮춤) */
    letter-spacing: 8px; /* 글자 간격을 더 넓게 조정 */
    white-space: nowrap; /* 줄바꿈 방지 */
    line-height: 1.1;
    margin: 20px 0;
    color: var(--primary-color);
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    animation: ${fadeIn} 1s ease-out 1s both;
  }

  p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto 30px;
    color: var(--text-color);
    animation: ${fadeIn} 1s ease-out 1.5s both;
  }
`;

const Spacer = styled.div`
  /* HeroContent와 ScrollIndicator 사이의 공간을 채움 */
  flex-grow: 1;
`;

const ScrollIndicator = styled.div`
  /* position: absolute 제거 */
  flex-shrink: 0; /* 크기가 줄어들지 않도록 */
  padding-bottom: 30px; /* 하단 여백 */

  color: var(--primary-color);
  font-size: 0.9rem;
  letter-spacing: 1px;
  opacity: 0.7;
  animation: ${fadeIn} 1s ease-out 2s both;

  span {
    display: block;
    margin-top: 10px;
    width: 2px;
    height: 30px;
    background-color: var(--primary-color);
    margin-left: auto;
    margin-right: auto;
    animation: scrollDown 2s infinite;
  }

  @keyframes scrollDown {
    0% { transform: translateY(-10px); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(10px); opacity: 0; }
  }
`;

function Hero() {
  return (
    <HeroSection id="home">
      <ContentContainer>
        <Spacer /> {/* 상단 공간을 채우는 스페이서 */}
        <HeroContent>
          <h5>Dongyeun Lee</h5>
          <h1>Robot system lab</h1>
          <p>FEM을 이해하는 힘, 산업을 이끄는 기술</p>
        </HeroContent>
        <Spacer /> {/* 하단 공간을 채우는 스페이서 */}
        <ScrollIndicator>
          SCROLL
          <span />
        </ScrollIndicator>
      </ContentContainer>
    </HeroSection>
  );
}

export default Hero; 