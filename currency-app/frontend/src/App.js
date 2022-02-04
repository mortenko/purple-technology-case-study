import React from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "global/global-styles";
import Currency from "components/Currency";
import Theme from "global/theme";

const App = () => (
  <>
    <GlobalStyle />
    <Theme>
      <Routes>
        <Route exact path="/" element={<Currency />} />
      </Routes>
    </Theme>
  </>
);

export default App;
