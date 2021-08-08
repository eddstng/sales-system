DROP TABLE IF EXISTS orders_items;

DROP TABLE IF EXISTS orders;

DROP TABLE IF EXISTS items;

DROP TABLE IF EXISTS customers;

\c postgres;

DROP OWNED BY sales_system_db;

DROP DATABASE IF EXISTS sales_system_db;

CREATE DATABASE sales_system_db;

DROP ROLE IF EXISTS sales_system_db;

CREATE ROLE sales_system_db WITH LOGIN;

ALTER USER sales_system_db WITH PASSWORD 'salessystemdb';

\c sales_system_db;

CREATE TABLE items (
    id SERIAL NOT NULL PRIMARY KEY,
    menu_id INTEGER,
    price FLOAT,
    name_eng VARCHAR(100) UNIQUE,
    name_chn VARCHAR(100) UNIQUE,
    category INTEGER
);

CREATE TABLE customers (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(15) UNIQUE,
    unit_number VARCHAR(5),
    street_number INTEGER,
    street_name VARCHAR(30),
    city VARCHAR(15),
    address TEXT,
    note TEXT
);

CREATE TABLE orders_items (
    id SERIAL NOT NULL PRIMARY KEY
    --  item_id INT FOREIGN KEY REFERENCES items (id)
    --  order_id INT FOREIGN KEY REFERENCES orders (id)
);

CREATE TABLE orders (
    id SERIAL NOT NULL PRIMARY KEY,
    total FLOAT,
    timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW()),
    type SMALLINT
    --  customer_id INT FOREIGN KEY REFERENCES customers (id)
);

ALTER TABLE
    orders_items
ADD
    COLUMN item_id INTEGER;

ALTER TABLE
    orders_items
ADD
    COLUMN order_id INTEGER;

ALTER TABLE
    orders_items
ADD
    CONSTRAINT fk_items FOREIGN KEY (item_id) REFERENCES items (id);

ALTER TABLE
    orders_items
ADD
    CONSTRAINT fk_orders FOREIGN KEY (order_id) REFERENCES orders (id);

ALTER TABLE
    orders
ADD
    COLUMN customer_id INTEGER;

ALTER TABLE
    orders
ADD
    CONSTRAINT fk_customers FOREIGN KEY (customer_id) REFERENCES customers (id);

GRANT ALL PRIVILEGES ON TABLE items TO sales_system_db;

GRANT ALL PRIVILEGES ON TABLE orders_items TO sales_system_db;

GRANT ALL PRIVILEGES ON TABLE orders TO sales_system_db;

GRANT ALL PRIVILEGES ON TABLE customers TO sales_system_db;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sales_system_db;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO sales_system_db;

GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO sales_system_db;

INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Austin Wallace',
        '6041230987',
        '5340 Charleston Crt',
        NULL,
        5340,
        'Charleston Crt',
        'Vancouver'
    );

INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Beatrix Harley',
        '6044211341',
        '910-1022 Bearton St',
        '910',
        1022,
        'Bearton St',
        'Vancouver'
    );

INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Catherine Trix',
        '6041222114',
        '1391 Horton Ave',
        NULL,
        1391,
        'Horton Ave',
        'Vancouver'
    );