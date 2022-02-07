const Router = require("@koa/router");
const currencyRoutes = require("./currency");

const apiRouter = new Router({ prefix: "/api" });

apiRouter.use("/currency", currencyRoutes);

module.exports = apiRouter;
