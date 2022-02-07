const axios = require("axios");
const config = require("../config");
const Currency = require("../models/Currency");
const koaResponse = require("../utils/koa-response");

class CurrencyControler {
  async getLiveCurrencies(ctx, next) {
    try {
      const response = await axios.get(
        `${config.currency_api.HOST}/live?${config.currency_api.ACCESS_KEY}`
      );
      return koaResponse(ctx, { data: response.data, status: 200 });
    } catch (error) {
      // normally would use some logging lib f.e. https://www.npmjs.com/package/koa2-winston
      console.error("An error occured when getting currency conversion", error);
      // I do not need to return response. it's just convention
      return koaResponse(ctx, {
        data: "An error occured when getting currency conversion",
        status: 500,
      });
    }
  }

  async getListCurrencies(ctx, next) {
    try {
      const response = await axios.get(
        `${config.currency_api.HOST}/list?${config.currency_api.ACCESS_KEY}`
      );
      return koaResponse(ctx, { data: response.data, status: 200 });
    } catch (error) {
      // normally would use some logging lib f.e. https://www.npmjs.com/package/koa2-winston
      console.error("An error occured when getting list of currencies", error);
      return koaResponse(ctx, {
        data: "An error occured when getting list of currencies",
        status: 500,
      });
    }
  }

  async saveStatistics(ctx, next) {
    const { to: finalCurrency, convertedInUSD } = ctx.body;
    try {
      await Currency.upsertPopularCurrency(finalCurrency);
      await Currency.upsertTotalAmountCurrency(convertedInUSD);
      const statistics = await Currency.getStatistics();
      return koaResponse(ctx, {
        status: 201,
        data: statistics,
      });
    } catch (error) {
      // normally would use some logging lib f.e. https://www.npmjs.com/package/koa2-winston
      console.error("An error occured when getting list of currencies", error);
      return koaResponse(ctx, {
        data: "An error occured when upserting data",
        status: 500,
      });
    }
  }

  async getStatistics(ctx, next) {
    try {
      const statistics = await Currency.getStatistics();
      return koaResponse(ctx, {
        data: statistics,
        status: 200,
      });
    } catch (error) {
      // normally would use some logging lib f.e. https://www.npmjs.com/package/koa2-winston
      console.error(
        "Statistics can't be returned from following reason:",
        error
      );
      return koaResponse(ctx, {
        data: "An error occured when getting statistics",
        status: 500,
      });
    }
  }
}

module.exports = new CurrencyControler();
