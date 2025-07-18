import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(to bottom, transparent, var(--background-dark1) 30%);
  text-align: center;
`;

const TextWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 15px;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      width: 60px;
      height: 3px;
      background: var(--primary-color);
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-color-muted);
  }
`;

function About() {
  return (
    <AboutSection id="about">
      <div className="container">
        <TextWrapper>
          <h2>ABOUT LAB</h2>
          <p>
            우리 연구실은 AI, 로봇공학, 미디어 기술의 융합 연구를 통해 차세대 교육 패러다임을 제시합니다. 끊임없는 도전과 혁신을 통해 미래 사회를 이끌어갈 핵심 기술을 개발하고 있으며, 다양한 분야의 전문가들이 협력하여 시너지를 창출하고 있습니다.
          </p>
        </TextWrapper>
      </div>
    </AboutSection>
  );
}

export default About; 