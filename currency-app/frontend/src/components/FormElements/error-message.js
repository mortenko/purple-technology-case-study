import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";

const StyledErrorMessage = styled.p`
  display: flex;
  align-items: flex-end;
  color: ${(props) => props.theme.colors.purpleDark};
  font-size: ${(props) => props.theme.px2rem(16)};
  font-family: Graphik-Medium;
`;

const StyledExclamationMark = styled.span((props) => ({
  backgroundColor: props.theme.colors.purple,
  color: props.theme.colors.white,
  borderRadius: props.theme.radius,
  fontSize: props.theme.px2rem(10),
  marginRight: props.theme.px2rem(5),
  padding: "0.2rem 0.4rem",
}));

const customErrorMessage = (name, errors) => (
  <ErrorMessage
    name={name}
    errors={errors}
    render={({ message }) => (
      <StyledErrorMessage data-cy="alert">
        <StyledExclamationMark> &#33;</StyledExclamationMark>
        <span>{message}</span>
      </StyledErrorMessage>
    )}
  />
);

export default customErrorMessage;
