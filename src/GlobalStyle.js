import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #000;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-image: url('/images/space.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  /* ... other global styles ... */
`;

export default GlobalStyle; 