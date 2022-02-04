import { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import React from "react";
import { px2rem, baseFontSize } from "./global-styles";

const Theme = ({ children }) => {
  const theme = {
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      greyLight: "#545357",
      greyMedium: "#8E8D93",
      greyDark: "#696969",
      greyShadow: "#00000029",
      purple: "#512BA5",
      purpleLight: "#AEA3FF",
      purpleWhite: "#F7F6FF",
      purpleDark: "#2E1777",
      rose: "#EC5990",
    },
    radius: "50px",
    borderRadius: "2px solid #512BA5",
    fontFamily: {
      graphikMedium: "Graphik-Medium",
      graphikBold: "Graphik-Bold",
      graphikSemiBold: "Graphik-SemiBold",
      graphikRegular: "Graphik-Regular",
    },
    px2rem: (sizeInPx) => px2rem(sizeInPx, baseFontSize),
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

Theme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Theme;
