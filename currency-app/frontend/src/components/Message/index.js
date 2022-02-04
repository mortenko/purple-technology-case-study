import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

const setColor = (props) => {
  switch (props.type) {
    case "error":
      return props.theme.colors.error;
    case "info":
      return props.theme.colors.purple;
    default:
      return props.theme.colors.black;
  }
};

const StyledMessage = styled.span`
  display: block;
  font-family: Graphik-bold;
  text-align: center;
  color: ${setColor};
`;

const Message = ({ type, message }) => (
  <StyledMessage type={type}>{message}</StyledMessage>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Message.defaultProps = {
  type: "info",
};

export default Message;
