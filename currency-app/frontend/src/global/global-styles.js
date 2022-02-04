import { createGlobalStyle } from "styled-components";
import GraphikBold from "assets/fonts/graphik/GraphikBold.otf";
import GraphikMedium from "assets/fonts/graphik/GraphikMedium.otf";
import GraphikRegular from "assets/fonts/graphik/GraphikRegular.otf";
import GraphikSemiBold from "assets/fonts/graphik/GraphikSemibold.otf";

const px2rem = (sizeInpx, baseFontSize) => {
  const result = sizeInpx / baseFontSize;
  if (result % 1 === 0) {
    return `${result}rem`;
  }
  return `${result.toFixed(4)}rem`;
};

const baseFontSize = "16";

const GlobalStyle = createGlobalStyle`
      @font-face {
        font-family: 'Graphik-Medium';
        src: url(${GraphikMedium});
      }
      @font-face {
        font-family: 'Graphik-Bold';
        src: url(${GraphikBold});
      }
      @font-face {
        font-family: 'Graphik-SemiBold';
        src: url(${GraphikSemiBold});
      }
      @font-face {
        font-family: 'Graphik-Regular';
        src: url(${GraphikRegular});
      }
      html {
        box-sizing: border-box;
      }
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
      body {
        width: 100%;
        height: 100%;
        font-size: ${baseFontSize}px;
        font-family: Graphik-Medium;
      }
      #root {
        min-height: 100%;
      }`;

export default GlobalStyle;
export { baseFontSize, px2rem };
