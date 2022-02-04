import React, { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import customErrorMessage from "./error-message";
import Label from "./label";

const StyledInput = styled.input`
  border-radius: ${(props) => props.theme.px2rem(5)};
  border: 0.5px solid
    ${(props) =>
      props.hasError ? props.theme.colors.rose : props.theme.colors.greyLight};
  width: 100%;
  font-size: inherit;
  font-family: Graphik-Medium;
  height: ${(props) => props.theme.px2rem(40)};
  padding: ${(props) => props.theme.px2rem(5)};
  margin-top: ${(props) => props.theme.px2rem(10)};
`;

const Input = forwardRef(
  ({ label, type, name, placeholder, errors, ...rest }, ref) => (
    <Label htmlFor={name}>
      {label}
      <StyledInput
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        ref={ref}
        {...rest}
      />
      {errors && customErrorMessage(name, errors)}
    </Label>
  )
);

Input.propTypes = {
  errors: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
};

Input.defaultProps = {
  errors: {},
  label: "",
  placeholder: "",
};

export default Input;
