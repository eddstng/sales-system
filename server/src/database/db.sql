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
    price FLOAT,
    name_eng VARCHAR(100) UNIQUE,
    name_chn VARCHAR(100) UNIQUE,
    sizes JSON,
    additional TEXT[]
);

CREATE TABLE customers (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(100),
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
    timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW())
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
    customers (name, phone, address)
VALUES
    (
        'Austin Wallace',
        '604-123-0987',
        '5340 Charleston Crt'
    );

INSERT INTO
    customers (name, phone, address)
VALUES
    (
        'Beatrix Harley',
        '604-421-1341',
        '910-1022 Bearton St'
    );

INSERT INTO
    customers (name, phone, address)
VALUES
    (
        'Catherine Trix',
        '604-122-2114',
        '1391 Horton Ave'
    );