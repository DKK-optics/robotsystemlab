import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProfessorSection = styled(motion.section)`
  padding: 120px 0;
  overflow: hidden;
  position: relative;
  background: transparent;

  @media (max-width: 768px) {
    padding: 60px 0; // 모바일 패딩 조정
  }
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto; // 모바일에서 높이 자동 조절
    position: static; // 모바일에서 sticky 해제
  }
`;

const ProfessorContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column; // 모바일에서 세로로 쌓이도록
    padding: 20px 0; // 모바일 패딩 추가
    height: auto; // 모바일에서 높이 자동 조절
  }
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

  @media (max-width: 768px) {
    position: static; // 모바일에서 static으로 변경
    width: 200px; // 모바일 이미지 크기 조정
    margin-bottom: 20px; // 아래 여백 추가
  }
`;

const Name = styled.h3`
  color: var(--primary-color);
  margin-bottom: 5px; /* 이름과 직책 사이 간격 */

  @media (max-width: 768px) {
    text-align: center; // 중앙 정렬
  }
`;

const Title = styled.p`
  color: var(--text-color-muted);
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    text-align: center; // 중앙 정렬
  }
`;

const TextWrapper = styled(motion.div)`
  position: absolute;
  width: 40%;
  max-width: 500px;

  h3 {
    color: var(--primary-color);
    margin-bottom: 5px; /* 이름과 직책 사이 간격 */
  }

  p {
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

  @media (max-width: 768px) {
    position: static; // 모바일에서 static으로 변경
    width: 90%; // 모바일 너비 조정
    max-width: 100%;
    padding: 0 20px; // 패딩 추가
    text-align: center; // 텍스트 중앙 정렬
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

    @media (max-width: 768px) {
      flex-direction: column; // 세로로 쌓이도록
      margin-bottom: 5px;
      align-items: center; // 중앙 정렬
    }
  }

  strong {
    width: 100px;
    color: var(--text-color-muted);

    @media (max-width: 768px) {
      width: auto; // 너비 자동 조절
      margin-bottom: 5px; // 아래 여백 추가
    }
  }

  @media (max-width: 768px) {
    margin-top: 10px; // 모바일 여백 조정
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

  @media (max-width: 768px) {
    margin-top: 10px; // 모바일 여백 조정
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

  // 모바일 환경에서는 애니메이션 값을 조정
  const mobileImageScale = useTransform(scrollYProgress, [0, 0.1], [1, 1]); // 모바일에서는 스케일 유지
  const mobileImageX = useTransform(scrollYProgress, [0, 0.1], ['0%', '0%']); // 모바일에서는 X 위치 유지
  const mobileTextX = useTransform(scrollYProgress, [0, 0.1], ['0%', '0%']); // 모바일에서는 X 위치 유지
  const mobileTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]); // 모바일에서는 투명도 유지

  return (
    <ProfessorSection id="professor" ref={targetRef}>
      <StickyContainer>
        <ProfessorContainer>
          <ImageWrapper 
            style={{ 
              scale: window.innerWidth > 768 ? imageScale : mobileImageScale, 
              x: window.innerWidth > 768 ? imageX : mobileImageX 
            }}>
            <img src={process.env.PUBLIC_URL + '/images/image5.jpeg'} alt="Dongyeun Lee 교수" />
          </ImageWrapper>
          <TextWrapper 
            style={{
              x: window.innerWidth > 768 ? textX : mobileTextX,
              opacity: window.innerWidth > 768 ? textOpacity : mobileTextOpacity
            }}>
            <h3>Dong-Yeon Lee</h3>
            <p style={{fontSize: '1rem', marginTop: '0', marginBottom: '15px', color: 'var(--text-color-muted)'}}>Ph. D., Professor</p>
            <InfoList>
              <li><strong>소속</strong> <span>로봇공학과</span></li>
              <li><strong>연구실</strong> <span>로봇관 (301호)</span></li>
              <li><strong>전화</strong> <span>053-810-2461</span></li>
            </InfoList>
            <MajorFieldList>
              <li><strong>Major Fields</strong></li>
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