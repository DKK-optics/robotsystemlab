import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #ffffff; // 강조색: 흰색
    --background-dark1: #000000; // 메인 배경: 검은색
    --background-dark2: #1a1a1a; // 보조 배경: 어두운 회색
    --text-color: #e0e0e0; // 메인 텍스트: 밝은 회색
    --text-color-muted: #888888; // 보조 텍스트: 회색
    --font-main: 'Poppins', 'Noto Sans KR', sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--background-dark1);
    background-image: url('/images/space.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: var(--text-color);
    font-family: var(--font-main);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
  }

  section {
    padding: 100px 0;
    position: relative;
    overflow: hidden;
    background-color: transparent; 
  }
`;

export default GlobalStyle; 