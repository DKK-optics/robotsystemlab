import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProfessorSection = styled(motion.section)`
  background: var(--background-dark1);
  height: 150vh; /* 스크롤 높이 단축 */
  position: relative;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
`;

const ProfessorContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled(motion.div)`
  position: absolute;
  width: 50vw; /* 초기 크기 */
  max-width: 600px;
  
  img {
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }
`;

const TextWrapper = styled(motion.div)`
  position: absolute;
  width: 40%;
  max-width: 500px;

  h3 {
    font-size: 2.5rem;
    color: var(--primary-color);
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-color-muted);
    margin-top: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 20px;
  }

  li {
    margin-bottom: 10px;
    color: var(--text-color);
  }
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;

  li {
    margin-bottom: 10px;
    color: var(--text-color);
    display: flex;
  }

  strong {
    width: 100px;
    color: var(--text-color-muted);
  }
`;

function Professor() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // 이미지 애니메이션: scale, x
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const imageX = useTransform(scrollYProgress, [0, 0.5], ['0%', '-80%']);

  // 텍스트 애니메이션: x, opacity
  const textX = useTransform(scrollYProgress, [0.4, 0.8], ['100%', '80%']);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  return (
    <ProfessorSection id="professor" ref={targetRef}>
      <StickyContainer>
        <ProfessorContainer>
          <ImageWrapper style={{ scale: imageScale, x: imageX }}>
            <img src="/images/image5.jpeg" alt="Dongyeun Lee 교수" />
          </ImageWrapper>
          <TextWrapper style={{ x: textX, opacity: textOpacity }}>
            <h3>Dongyeun Lee</h3>
            <p>
              로봇 시스템 및 제어 분야의 전문가로서, 다년간의 연구 경험과 산업 협력 프로젝트를 통해 얻은 지식을 바탕으로 학생들을 지도하고 있습니다. 주요 연구 관심사는 지능형 로봇, 인간-로봇 상호작용, 그리고 자동화 시스템입니다.
            </p>
            <InfoList>
              <li><strong>소속</strong> <span>로봇공학과</span></li>
              <li><strong>전공분야</strong> <span>나노시스템</span></li>
              <li><strong>연구실</strong> <span>로봇관 (301호)</span></li>
              <li><strong>전화</strong> <span>053-810-2461</span></li>
            </InfoList>
            <ul>
              <li>- Ph.D. in Mechanical Engineering, KAIST</li>
              <li>- M.S. in Mechanical Engineering, KAIST</li>
              <li>- B.S. in Mechanical Engineering, Korea University</li>
            </ul>
          </TextWrapper>
        </ProfessorContainer>
      </StickyContainer>
    </ProfessorSection>
  );
}

export default Professor; 