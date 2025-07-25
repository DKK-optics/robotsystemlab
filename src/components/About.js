import React, { forwardRef } from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  background: var(--background-dark1); /* 항상 검은색 배경 */
  color: var(--text-color);
  position: relative;
  overflow: hidden;
  padding: 100px 0;
  /* background: linear-gradient(to bottom, transparent, var(--background-dark1) 30%); */
  text-align: center;
  /* font-size: 2.5rem; */ // 제거
  /* margin-bottom: 60px; */ // 제거
  /* font-family: var(--font-orbitron); */ // Orbitron 폰트 적용 제거

  @media (max-width: 768px) {
    padding: 60px 0; // 모바일 패딩 조정
    /* margin-bottom: 40px; */ // 제거
  }
`;

const TextWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h2 {
    /* font-size: 2.5rem; */ // 제거
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

    @media (max-width: 768px) {
      /* font-size: 2rem; */ // 제거
      margin-bottom: 15px;
    }
  }

  p {
    /* font-size: 1.1rem; */ // 제거
    line-height: 1.8;
    color: var(--text-color-muted);

    @media (max-width: 768px) {
      /* font-size: 0.9rem; */ // 제거
    }
  }
`;

const About = forwardRef((props, ref) => {
  return (
    <AboutSection id="about" ref={ref}>
      <div className="container">
        <TextWrapper>
          <h2>ABOUT LAB</h2>
          <p>
            우리 연구실은 AI‧로봇공학‧미디어 기술을 융합해 차세대 교육 패러다임을 제시합니다. 로봇 시스템 설계 단계부터 <strong>ANSYS 기반 FEM 시뮬레이션</strong>으로 구조·동역학 특성을 정밀 검증하고, AI 알고리즘을 통해 시뮬레이션과 실험 데이터를 상호 보정하여 연구 효율을 극대화합니다. 전공이 다른 연구진들이 긴밀히 협력해 미래 사회를 선도할 핵심 로봇 기술을 창출하고 있습니다.
          </p>
        </TextWrapper>
      </div>
    </AboutSection>
  );
});

export default About; 