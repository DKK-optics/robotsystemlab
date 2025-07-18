import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  background: var(--background-dark1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  
  h5 {
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 4px;
    color: var(--text-color-muted);
    animation: ${fadeIn} 1s ease-out 0.5s both;
  }

  h1 {
    font-size: clamp(3rem, 10vw, 5.5rem);
    font-weight: 800;
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

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
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
      <HeroContent>
        <h5>Dongyeun Lee</h5>
        <h1>
          Robot system lab
        </h1>
        <p>하중을 이해하는 힘, 산업을 이끄는 기술</p>
      </HeroContent>
      <ScrollIndicator>
        SCROLL
        <span />
      </ScrollIndicator>
    </HeroSection>
  );
}

export default Hero; 