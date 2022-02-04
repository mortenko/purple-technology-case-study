import React from "react";
import styled from "styled-components";
import _ from "lodash";
import Text from "components/Text";
import PropTypes from "prop-types";

const StyledStatistics = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  align-items: flex-start;
  border: 5px solid black;
  margin-top: ${(props) => props.theme.px2rem(10)};
  padding: ${(props) => props.theme.px2rem(10)};
  border-radius: ${(props) => props.theme.radius};
  div:first-child {
    align-self: center;
  }
  div {
    padding: ${(props) => props.theme.px2rem(5)};
  }
`;

const Statistics = ({ statistics }) =>
  !_.isEmpty(statistics) ? (
    <StyledStatistics>
      <div>
        <Text xxl align="center">
          Statistics
        </Text>
      </div>
      <div>
        Total number of conversion:
        <Text bold xl>
          {statistics.totalAmountConversion}
        </Text>
      </div>
      <div>
        Total amount converted in USD:
        <Text bold xl>
          {statistics.totalAmountUSD}
        </Text>
      </div>
      <div>
        Most popular destination Currency:
        <Text bold xl>
          {statistics.most_popular.name}({statistics.most_popular.popularity})
        </Text>
      </div>
    </StyledStatistics>
  ) : (
    <Text bold xl align="center">
      There are not Statistics
    </Text>
  );

Statistics.propTypes = {
  statistics: PropTypes.shape({
    most_popular: PropTypes.shape({
      name: PropTypes.string,
      popularity: PropTypes.number,
    }),
    totalAmountConversion: PropTypes.number,
    totalAmountUSD: PropTypes.number,
  }),
};

Statistics.defaultProps = {
  statistics: {
    most_popular: {
      name: "",
      popularity: 0,
    },
    totalAmountConversion: 0,
    totalAmountUSD: 0,
  },
};

export default Statistics;
