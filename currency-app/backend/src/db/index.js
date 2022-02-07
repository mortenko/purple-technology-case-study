// could be consider also better-sqlite3 lib as replacement for combination sqlite3 and sqlite
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();
const config = require("../config.json");

let dbConn = null;

const initializeDB = async () => {
  if (dbConn == null) {
    try {
      dbConn = await open({
        filename: `./src/db/${config.database.NAME}`,
        driver: sqlite3.Database,
      });
      return dbConn;
    } catch (error) {
      console.error("An error occured when initialize db connection", error);
      throw Error(error);
    }
  }
  return dbConn;
};

const close = async () => {
  try {
    if (dbConn) {
      await dbConn.close();
      dbConn = null;
      console.info("Database connection is closed");
    }
  } catch (error) {
    console.info("Database cant be closed from following reason", error);
  }
};

const getQueryRow = async (query, values = []) => {
  const db = await initializeDB();
  try {
    console.info("Query to run:", JSON.stringify(query));
    const stmt = await db.prepare(query);
    const row = await stmt.get(values);
    stmt.finalize();
    return row;
  } catch (error) {
    console.error("An error occured when executing getQueryRow:", error);
    throw Error(error);
  } finally {
    await close();
  }
};

const runQuery = async (query, values = []) => {
  const db = await initializeDB();
  try {
    console.info("Query to run:", JSON.stringify(query));
    const stmt = await db.prepare(query);
    await stmt.run(values);
    stmt.finalize();
  } catch (error) {
    console.error("An error occured when executing runQuery:", error);
    throw Error(error);
  } finally {
    await close();
  }
};

module.exports = {
  getQueryRow,
  runQuery,
  close,
};
