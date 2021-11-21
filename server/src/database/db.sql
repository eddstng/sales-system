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
    id SERIAL NOT NULL PRIMARY KEY,
    quantity INTEGER,
    customizations jsonb,
    custom_price FLOAT,
    custom_name VARCHAR(30),
    timestamp TIMESTAMP WITHOUT TIME ZONE
    --  item_id INT FOREIGN KEY REFERENCES items (id)
    --  order_id INT FOREIGN KEY REFERENCES orders (id)
);

CREATE TABLE orders (
    id SERIAL NOT NULL PRIMARY KEY,
    total FLOAT,
    timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW()),
    type SMALLINT,
    void BOOLEAN NOT NULL DEFAULT FALSE,
    paid BOOLEAN NOT NULL DEFAULT FALSE
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

CREATE OR REPLACE view orders_items_detail
AS
SELECT
o.id as order_id,
o.timestamp as order_timestamp,
o.type as order_type,
o.total as order_total,
o.void as order_void,
o.paid as order_paid,
c.id as customer_id,
c.name as customer_name,
c.phone as customer_phone,
c.address as customer_address,
c.note as customer_note,
i.id as item_id,
i.menu_id as item_menu_id,
i.category as item_category,
case
	when oi.custom_name IS NULL then i.name_eng
	when oi.custom_name IS NOT NULL then oi.custom_name
end as item_name_eng,
i.name_chn as item_name_chn,
case
	when oi.custom_price IS NULL then i.price
	when oi.custom_price IS NOT NULL then oi.custom_price
end as item_price,
oi.quantity as orders_items_quantity,
oi.customizations as orders_items_customizations,
oi.timestamp as orders_items_timestamp
from orders_items oi 
LEFT JOIN items i ON oi.item_id = i.id
LEFT JOIN orders o ON oi.order_id = o.id
LEFT JOIN customers c ON o.customer_id = c.id;

CREATE OR REPLACE view orders_history
AS
SELECT
o.id as order_id,
o.timestamp as order_timestamp,
o.type as order_type,
o.total as order_total,
o.void as order_void,
o.paid as order_paid,
c.id as customer_id,
c.name as customer_name,
c.phone as customer_phone
from orders o
LEFT JOIN customers c ON o.customer_id = c.id;

INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Table #1',
        '0000000001',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );

INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Table #2',
        '0000000002',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );


INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Table #3',
        '0000000003',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );


INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Table #4',
        '0000000004',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );


INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Table #5',
        '0000000005',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );


INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Table #6',
        '0000000006',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );


INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Table #7',
        '0000000007',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );


INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Table #8',
        '0000000008',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );


INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Table #9',
        '0000000009',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );


INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Table #10',
        '0000000010',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );

INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Table #11',
        '0000000011',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );

INSERT INTO
    customers (name, phone, address, unit_number, street_number, street_name, city)
VALUES
    (
        'Table #12',
        '0000000012',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );

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