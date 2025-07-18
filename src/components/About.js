import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  background: var(--background-dark2);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; /* 텍스트 중앙 정렬 */
`;

const AboutContainer = styled.div`
  max-width: 800px; /* 텍스트 너비 제한 */
  margin: 0 auto; /* 컨테이너를 중앙에 배치 */
`;

const TextWrapper = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 15px;
    display: inline-block; /* h2 밑줄이 텍스트 길이에 맞게 조정되도록 */

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
        <AboutContainer>
          <TextWrapper>
            <h2>ABOUT US</h2>
            <p>
              우리 연구실은 AI, 로봇공학, 미디어 기술의 융합 연구를 통해 차세대 교육 패러다임을 제시합니다. 끊임없는 도전과 혁신을 통해 미래 사회를 이끌어갈 핵심 기술을 개발하고 있으며, 다양한 분야의 전문가들이 협력하여 시너지를 창출하고 있습니다.
            </p>
          </TextWrapper>
        </AboutContainer>
      </div>
    </AboutSection>
  );
}

export default About; 