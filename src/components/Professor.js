import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProfessorSection = styled(motion.section)`
  padding: 120px 0;
  overflow: hidden;
  position: relative;
  background: transparent;
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

const Name = styled.h3`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 5px; /* 이름과 직책 사이 간격 */
`;

const Title = styled.p`
  font-size: 1rem;
  color: var(--text-color-muted);
  margin: 0;
  padding: 0;
`;

const TextWrapper = styled(motion.div)`
  position: absolute;
  width: 40%;
  max-width: 500px;

  h3 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 5px; /* 이름과 직책 사이 간격 */
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

const MajorFieldList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  
  li {
    margin-bottom: 8px;
    color: var(--text-color);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  background-color: var(--background-dark2);
  border-radius: 8px;
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
            <h3>Dong-Yeon Lee</h3>
            <p style={{fontSize: '1rem', marginTop: '0', marginBottom: '15px', color: 'var(--text-color-muted)'}}>Ph. D., Professor</p>
            <InfoList>
              <li><strong>소속</strong> <span>로봇공학과</span></li>
              <li><strong>연구실</strong> <span>로봇관 (301호)</span></li>
              <li><strong>전화</strong> <span>053-810-2461</span></li>
            </InfoList>
            <MajorFieldList>
              <li><strong>§ Major Field:</strong></li>
              <li>　- Nano-Design, Measurement and Control</li>
              <li>　- Nano-Opto-Mechatronics</li>
              <li>　- Atomic Force Microscope, Nano-Lithographic Machine</li>
            </MajorFieldList>
          </TextWrapper>
        </ProfessorContainer>
      </StickyContainer>
    </ProfessorSection>
  );
}

export default Professor; 