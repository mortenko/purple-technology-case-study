CREATE TABLE IF NOT EXISTS stats_currency (
    id INTEGER PRIMARY KEY NOT NULL,
    total_amount_usd DECIMAL NULL,
    total_amount_conversion INTEGER NULL
);
CREATE TABLE IF NOT EXISTS popular_currency(
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT UNIQUE NULL,
    popularity INTEGER NULL
);
CREATE INDEX popularity_index ON popular_currency (popularity)