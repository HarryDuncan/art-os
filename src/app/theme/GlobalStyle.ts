import { createGlobalStyle } from "styled-components";
import ttfFont from "./fonts/AnimationS.ttf";
import woff from "./fonts/AnimationS.woff";
export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: "HarryDuncan";
  font-style: normal;
  font-weight: 100;
  src: local("HarryDuncan");
  src: url(${woff}), format("woff");
  src: url(${ttfFont}) format("truetype"); /* Safari, Android, iOS */
}
  body {
    
  }
  
 h1 { font-family : 'HarryDuncan'}
 h2 { font-family : 'HarryDuncan'}
`;
