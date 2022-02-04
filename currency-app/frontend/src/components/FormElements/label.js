import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

const StyledLabel = styled.label`
  font-family: ${(props) => props.theme.fontFamily.graphikRegular};
  font-size: ${(props) => props.theme.px2rem(14)};
`;

const Label = ({ children, htmlFor }) => (
  <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>
);

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.element
}.isRequired;

export default Label;