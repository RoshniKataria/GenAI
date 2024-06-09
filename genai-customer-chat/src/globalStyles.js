// src/globalStyles.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.primaryColor};
    font-family: 'Arial', sans-serif;
  }
`;

export default GlobalStyle;
