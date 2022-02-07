const db = require("../db");

class Currency {
  async upsertPopularCurrency(finalCurrency) {
    const currency = await db.getQueryRow(
      "SELECT name FROM popular_currency WHERE name=?",
      finalCurrency
    );
    if (currency) {
      const { name } = currency;
      return db.runQuery(
        "UPDATE popular_currency SET popularity = popularity + 1 where name = ?",
        name
      );
    }
    return db.runQuery(
      "INSERT INTO popular_currency (name,popularity) VALUES(?,?)",
      [finalCurrency, 1]
    );
  }

  async upsertTotalAmountCurrency(convertedInUSD) {
    const total_amount = await db.getQueryRow(
      `SELECT total_amount_usd, 
              total_amount_conversion 
       FROM stats_currency`
    );
    if (total_amount) {
      return db.runQuery(
        `UPDATE stats_currency 
         SET total_amount_usd = total_amount_usd + ?,
         total_amount_conversion = total_amount_conversion + ?
         `,
        [convertedInUSD, 1]
      );
    }
    return db.runQuery(
      `INSERT INTO stats_currency 
              (total_amount_usd, total_amount_conversion) 
               VALUES(?,?)`,
      [convertedInUSD, 1]
    );
  }

  async getStatistics() {
    const total_amount = await db.getQueryRow(
      `SELECT total_amount_usd as totalAmountUSD, 
              total_amount_conversion as totalAmountConversion 
      FROM stats_currency
      `
    );
    const popular_currency = await db.getQueryRow(
      `WITH ct_most_popular AS (
            SELECT id, MAX(popularity) as popularity
            FROM popular_currency
            )
       SELECT pc.name, pc.popularity 
       FROM popular_currency pc
       JOIN ct_most_popular mp ON  mp.popularity = pc.popularity
      `
    );

    const statistics = {
      totalAmountUSD: total_amount
        ? parseFloat(total_amount.totalAmountUSD.toFixed(2))
        : 0,
      totalAmountConversion: total_amount
        ? total_amount.totalAmountConversion
        : 0,
      most_popular: {
        name: popular_currency ? popular_currency.name : "",
        popularity: popular_currency ? popular_currency.popularity : 0,
      },
    };
    return statistics;
  }
}

module.exports = new Currency();
