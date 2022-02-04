import React from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Input, Select } from "components/FormElements";
import Button from "components/Button";

const StyledForm = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const StyledRow = styled.div`
  padding-bottom: ${(props) => props.theme.px2rem(15)};
`;

const StyledButtons = styled.div`
  display: flex;
  flex-flow: columns nowrap;
  justify-content: space-between;
  width: inherit;
`;

const CurrencyForm = ({ handleSubmitForm, showStatistics, currencies }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  return (
    <StyledForm>
      <StyledRow>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              errors={errors}
              label="Amount:"
              placeholder="amount"
              type="text"
            />
          )}
          control={control}
          defaultValue=""
          name="amount"
          rules={{
            required: { value: true, message: "This field is mandatory" },
            pattern: {
              value: /^[\d]+$/,
              message: "This field must be a number",
            },
          }}
        />
      </StyledRow>
      <StyledRow>
        <Controller
          render={({ field }) => (
            <Select
              errors={errors}
              label="From:"
              items={currencies}
              placeholder="choose currency"
              {...field}
            />
          )}
          control={control}
          name="from"
          rules={{
            required: { value: true, message: "This field is mandatory" },
          }}
        />
      </StyledRow>
      <StyledRow>
        <Controller
          render={({ field }) => (
            <Select
              items={currencies}
              errors={errors}
              label="To:"
              placeholder="choose currency"
              {...field}
            />
          )}
          control={control}
          name="to"
          rules={{
            required: { value: true, message: "This field is mandatory." },
          }}
        />
      </StyledRow>
      <StyledRow>
        <StyledButtons>
          <Button onClick={showStatistics}>Statistics</Button>
          <Button onClick={handleSubmit(handleSubmitForm)}>Convert</Button>
        </StyledButtons>
      </StyledRow>
    </StyledForm>
  );
};

CurrencyForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, value: PropTypes.string })
  ),
  handleSubmitForm: PropTypes.func.isRequired,
  showStatistics: PropTypes.func.isRequired,
};

CurrencyForm.defaultProps = {
  currencies: [],
};

export default CurrencyForm;
