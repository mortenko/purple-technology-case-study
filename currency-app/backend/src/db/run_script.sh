#!/bin/sh

sqlite3 ./src/db/currency.db < "./src/db/init_script.sql"