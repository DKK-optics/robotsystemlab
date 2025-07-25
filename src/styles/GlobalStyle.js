import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #ffffff; // 강조색: 흰색
    --background-dark1: #000000; // 메인 배경: 검은색
    --background-dark2: #1a1a1a; // 보조 배경: 어두운 회색
    --text-color: #e0e0e0; // 메인 텍스트: 밝은 회색
    --text-color-muted: #888888; // 보조 텍스트: 회색
    --font-main: 'Poppins', 'Noto Sans KR', sans-serif;
    --font-orbitron: 'Orbitron', sans-serif; // Orbitron 폰트 변수 추가
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    position: relative; // Added for Framer Motion scroll offset calculation
    background-color: var(--background-dark1);
    /* background-image: url(${process.env.PUBLIC_URL + '/images/space.jpg'}); */
    /* background-size: cover; */
    /* background-position: center; */
    /* background-attachment: fixed; */
    color: var(--text-color);
    font-family: var(--font-main);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    font-size: 16px; // 기본 폰트 사이즈
    line-height: 1.6; // 기본 라인 높이

    @media (max-width: 768px) {
      font-size: 14px; // 모바일에서 기본 폰트 사이즈 약간 줄임
      line-height: 1.5; // 모바일에서 라인 높이 조정
    }
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
  }

  h1 {
    font-size: clamp(3rem, 8vw, 5.5rem); // 반응형 h1
  }

  h2 {
    font-size: clamp(2rem, 6vw, 2.5rem); // 반응형 h2
  }

  h3 {
    font-size: clamp(1.5rem, 4vw, 2rem); // 반응형 h3
  }

  h4 {
    font-size: clamp(1.2rem, 3.5vw, 1.5rem); // 반응형 h4
  }

  h5, h6 {
    font-size: clamp(1rem, 3vw, 1.2rem); // 반응형 h5, h6
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;

    @media (max-width: 768px) {
      padding: 0 20px; // 모바일 패딩 조정
    }
  }

  section {
    padding: 100px 0;
    position: relative;
    overflow: hidden;
    background-color: transparent; 
  }
`;

export default GlobalStyle; 