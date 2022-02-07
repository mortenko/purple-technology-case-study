const Router = require("@koa/router");
const {
  getLiveCurrencies,
  getListCurrencies,
  saveStatistics,
  getStatistics,
} = require("../controllers/currencyController");

const router = new Router();

router.get("/live", getLiveCurrencies);
router.get("/list", getListCurrencies);
router.post("/save/statistics", saveStatistics);
router.get('/statistics', getStatistics)

module.exports = router.routes();
