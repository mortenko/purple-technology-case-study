import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import axiosClient from "utils/axios";
import Text from "components/Text";
import purpleLogo from "assets/purple_logo.png";
import Statistics from "./statistics";
import CurrencyForm from "./form";

const StyledCurrency = styled.div`
  display: flex;
  flex-flow: column;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
`;

const StyledTitle = styled.h1`
  text-align: center;
`;

const StyledLogoWrapper = styled.div`
  position: absolute;
  top: ${(props) => props.theme.px2rem(20)};
  right: ${(props) => props.theme.px2rem(150)};
`;

const StyledLogo = styled.img``;

const StyledTitleHeader = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const StyledConversionResult = styled.div`
  display: relative;
  width: 100%;
  text-align: center;
  margin-top: ${(props) => props.theme.px2rem(30)};
`;

const Currency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [conversionResult, setConversionResult] = useState({});
  const [statistics, setStatistics] = useState({});
  const [isOpen, setOpen] = useState(false);

  const convertCurrencies = async ({ from, to, amount }) => {
    const regexFrom = new RegExp(`(USD)(${from})`);
    const regexTo = new RegExp(`(USD)(${to})`);

    const { data } = await axiosClient(
      `${process.env.REACT_APP_BASE_URL}/currency/live`
    );

    const result = Object.entries(data.quotes)
      .filter(([key]) => regexFrom.test(key) || regexTo.test(key))
      .flatMap(([key, value]) =>
        regexFrom.test(key) ? { fromVal: value } : { toVal: value }
      );

    const toObj = Object.assign({}, ...result);

    const conversion = (
      (parseInt(amount, 10) / toObj.fromVal) *
      toObj.toVal
    ).toFixed(2);
    const convertedInUSD = conversion / toObj.toVal;

    setConversionResult({
      converted: `${conversion}(${to})`,
      convertedInUSD,
    });

    return {
      converted: `${conversion}(${to})`,
      convertedInUSD,
    };
  };

  const sendStatistics = async ({ convertedInUSD, to }) => {
    const body = {
      to,
      convertedInUSD,
    };

    return axiosClient(
      `${process.env.REACT_APP_BASE_URL}/currency/save/statistics`,
      "POST",
      { body }
    );
  };

  const showStatistics = async () => {
    const { data } = await axiosClient(
      `${process.env.REACT_APP_BASE_URL}/currency/statistics`
    );
    setStatistics(data);
    setOpen(!isOpen);
  };

  const handleSubmitForm = async (values) => {
    const convertedData = await convertCurrencies(values);
    const { data } = await sendStatistics({ ...convertedData, ...values });
    setStatistics(data);
  };

  useEffect(() => {
    const getListOfCurrencies = async () => {
      const { data } = await axiosClient(
        `${process.env.REACT_APP_BASE_URL}/currency/list`
      );
      const currencyList = data.currencies
        ? _.orderBy(
            Object.entries(data.currencies).map(([key, value]) => ({
              key,
              value,
            })),
            "value"
          )
        : [];
      setCurrencies(currencyList);
    };
    getListOfCurrencies();
  }, [setCurrencies]);
  return (
    <StyledCurrency>
      <StyledTitleHeader>
        <StyledTitle>Currency App</StyledTitle>
        <StyledLogoWrapper>
          <StyledLogo
            width={40}
            height={40}
            src={purpleLogo}
            alt="purple logo"
          />
        </StyledLogoWrapper>
      </StyledTitleHeader>
      <CurrencyForm
        showStatistics={showStatistics}
        handleSubmitForm={handleSubmitForm}
        currencies={currencies}
      />
      {conversionResult.converted && (
        <StyledConversionResult>
          <Text bold xl>
            Result of conversion is:
          </Text>
          <br />
          <Text info bold xl>
            {conversionResult.converted}
          </Text>
        </StyledConversionResult>
      )}
      {isOpen && <Statistics statistics={statistics} />}
    </StyledCurrency>
  );
};

export default Currency;
