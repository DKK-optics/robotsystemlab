import React, { forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const HeroSection = styled.section`
  height: 100vh;
  /* background:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${process.env.PUBLIC_URL + '/images/space.jpg'});
  background-size: cover;
  background-position: center;
  background-attachment: fixed; */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; // Particles를 위한 position
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
    font-family: var(--font-orbitron); // Orbitron 폰트 적용
  }

  h1 {
    font-family: var(--font-orbitron); // Orbitron 폰트 적용
    font-size: clamp(3rem, 10vw, 5.5rem);
    font-weight: 400; /* 폰트 두께를 얇게 조정 (기본값보다 낮춤) */
    letter-spacing: 8px; /* 글자 간격을 더 넓게 조정 */
    white-space: nowrap; /* 줄바꿈 방지 */
    line-height: 1.1;
    margin: 20px 0;
    color: var(--primary-color);
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  }

  p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto 30px;
    color: var(--text-color);
    font-family: var(--font-orbitron); // Orbitron 폰트 적용
  }
`;

const Spacer = styled.div`
  /* HeroContent와 ScrollIndicator 사이의 공간을 채움 */
  flex-grow: 1;
`;

const ScrollIndicator = styled(motion.div)` // motion.div로 변경
  /* position: absolute 제거 */
  flex-shrink: 0; /* 크기가 줄어들지 않도록 */
  padding-bottom: 30px; /* 하단 여백 */

  color: var(--primary-color);
  font-size: 0.9rem;
  letter-spacing: 1px;
  opacity: 0.7;

  span {
    display: block;
    margin-top: 10px;
    width: 2px;
    height: 30px;
    background-color: var(--primary-color);
    margin-left: auto;
    margin-right: auto;
  }

  /* @keyframes scrollDown {
    0% { transform: translateY(-10px); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(10px); opacity: 0; }
  } */
`;

// --- Animation Variants --- 
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: {
      staggerChildren: 0.2, // 자식 요소들이 0.2초 간격으로 나타남
      delayChildren: 0.5 // 부모 애니메이션 시작 후 0.5초 뒤에 자식 애니메이션 시작
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100
    }
  }
};

function Hero(_, ref) {
  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  const particlesOptions = {
    background: {
      color: {
        value: "#000000", // 검은색 배경
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: false,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff", // 별 색상
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: false, // 선 비활성화
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 0.3, // 별이 움직이는 속도
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80, // 별 개수
      },
      opacity: {
        value: 0.5, // 별 투명도
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 }, // 별 크기
      },
    },
    detectRetina: true,
  };

  return (
    <HeroSection id="home" ref={ref}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, // 배경으로 설정
        }}
      />
      <ContentContainer>
        <Spacer /> {/* 상단 공간을 채우는 스페이서 */}
        <HeroContent
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h5 variants={itemVariants}>Dongyeun Lee</motion.h5>
          <motion.h1 variants={itemVariants}>Robot system lab</motion.h1>
          <motion.p variants={itemVariants}>FEM을 이해하는 힘, 산업을 이끄는 기술</motion.p>
        </HeroContent>
        <Spacer /> {/* 하단 공간을 채우는 스페이서 */}
        <ScrollIndicator
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 2.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          SCROLL
          <span />
        </ScrollIndicator>
      </ContentContainer>
    </HeroSection>
  );
}

export default Hero; 