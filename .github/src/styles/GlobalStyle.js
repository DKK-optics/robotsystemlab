import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Poppins:wght@300;400;500;700&display=swap');

  :root {
    --primary-color: #ffffff;
    --background-dark1: #000000;
    --background-dark2: #1a1a1a;
    --text-color: #e0e0e0;
    --text-color-muted: #888888;
    --font-main: 'Poppins', 'Noto Sans KR', sans-serif;
    --font-orbitron: 'Orbitron', sans-serif;
  }

  /* ... rest of the styles ... */
`;

export default GlobalStyle;
