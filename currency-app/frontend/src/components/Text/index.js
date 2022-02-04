import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

const base = (theme) => `color: ${theme.colors.black}`;
const info  = (theme) => `color: ${theme.colors.purpleDark}`;
const setFontSize = (size) => `font-size: ${size}rem`;
const bold = () => "font-family: Graphik-bold";
const horizontalAlign = (alignment) => `text-align: ${alignment}`;

const StyledText = styled.span`
  ${(props) => props.align && horizontalAlign(props.align)};
  ${(props) => props.info && info(props.theme)};
  ${(props) => props.base && base(props.theme)};
  ${(props) => props.xxl && setFontSize(2.5)};
  ${(props) => props.xl && setFontSize(1.5)};
  ${(props) => props.md && setFontSize(1)};
  ${(props) => props.xs && setFontSize(0.7)};
  ${(props) => props.bold && bold()};
`;

const Text = ({ children, ...props }) => (
  <StyledText {...props}>{children}</StyledText>
);

Text.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Text;
