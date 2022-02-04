import styled from "styled-components";
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef, forwardRef } from "react";
import { ReactComponent as ArrowDown } from "assets/arrow_down.svg";
import Message from "components/Message";
import customErrorMessage from "./error-message";
import Label from "./label";

const StyledWrapper = styled.div`
  position: relative;
  margin-top: ${(props) => props.theme.px2rem(12)};
  border: 0.5px solid black;
  border-radius: ${(props) => props.theme.px2rem(5)};
  height: ${(props) => props.theme.px2rem(40)};
`;

const StyledSelect = styled.div`
  position: absolute;
  top: ${(props) => props.theme.px2rem(40)};
  width: 100%;
  max-height: ${(props) => props.theme.px2rem(250)};
  background-color: ${(props) => props.theme.colors.white};
  z-index: 1;
  overflow: auto;
  border-radius: ${(props) => props.theme.px2rem(5)};
  border: 0.5px solid ${(props) => props.theme.colors.greyLight};
`;

const StyledOption = styled.div`
  padding: ${(props) => props.theme.px2rem(12)};
  border-bottom: 0.5px solid ${(props) => props.theme.colors.greyLight};
  &:hover {
    background-color: ${(props) => props.theme.colors.purpleLight};
    cursor: pointer;
  }
`;

const StyledSelectedValue = styled.span`
  display: inline-block;
  padding: ${(props) => props.theme.px2rem(12)};
`;

const StyledArrow = styled.div`
  position: absolute;
  top: ${(props) => props.theme.px2rem(10)};
  right: ${(props) => props.theme.px2rem(12)};
`;

const Select = forwardRef(
  ({ items, label, name, onChange, errors, placeholder }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [optionItems, setOptionItems] = useState([]);
    const selectRef = useRef(null);

    useEffect(() => {
      setOptionItems(items);
    }, [items]);

    const handleOnChange = (key, value) => {
      setSelectedOption(`${value} (${key})`);
      onChange(key);
    };

    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }, []);

    return (
      <>
        <Label htmlFor={label}>{label}</Label>
        <StyledWrapper ref={selectRef} onClick={() => setIsOpen(!isOpen)}>
          <StyledArrow>
            <ArrowDown width={15} height={15} />
          </StyledArrow>
          <StyledSelectedValue>
            {selectedOption || placeholder}
          </StyledSelectedValue>
          {isOpen && (
            <StyledSelect>
              {optionItems && optionItems.length > 0 ? (
                optionItems.map(({ key, value }) => (
                  <StyledOption
                    key={key}
                    onClick={() => handleOnChange(key, value)}
                  >
                    {`${value} (${key})`}
                  </StyledOption>
                ))
              ) : (
                <StyledOption>
                  <Message type="info" message="select has no options" />
                </StyledOption>
              )}
            </StyledSelect>
          )}
        </StyledWrapper>
        {errors && customErrorMessage(name, errors)}
      </>
    );
  }
);

Select.propTypes = {
  errors: PropTypes.objectOf(PropTypes.any),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

Select.defaultProps = {
  errors: {},
  placeholder: "",
};

export default Select;
