import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #ffffff; // 변경: 강조색을 흰색으로
    --background-dark1: #0a0a0a;
    --background-dark2: #141414;
    --text-color: #e0e0e0;
    --text-color-muted: #888888;
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
    background: var(--background-dark1);
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
  }
`;

export default GlobalStyle; 