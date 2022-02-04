import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

const StyledButton = styled.div((props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  minWidth: props.theme.px2rem(200),
  height: props.theme.px2rem(65),
  cursor: "pointer",
  padding: props.theme.px2rem(5),
  backgroundColor: props.theme.colors.purple,
  fontSize: props.theme.px2rem(18),
  fontFamily: props.theme.fontFamily.graphikSemiBold,
  color: props.theme.colors.white,
  borderRadius: props.theme.radius,
  border: props.ghost ? "none" : `2px solid ${props.theme.colors.purple}`,
  "&:hover": {
    backgroundColor:
      props.hover && !props.disabled && props.theme.colors.purpleWhite,
  },
  "&:active": {
    backgroundColor: props.theme.colors.purpleLight,
    boxShadow: "0 5px #666",
    transform: "translateY(4)",
  },
}));

const Button = ({ children, onClick, ...rest }) => (
  <StyledButton onClick={onClick} {...rest}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  hover: false,
  onClick: () => {},
};

export default Button;