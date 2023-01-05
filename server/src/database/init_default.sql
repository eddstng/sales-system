iDROP TABLE IF EXISTS orders_items;

DROP TABLE IF EXISTS orders;

DROP TABLE IF EXISTS items;

DROP TABLE IF EXISTS customers;

\c postgres;

-- DROP OWNED BY sales_system_db;

-- DROP DATABASE IF EXISTS sales_system_db;

-- CREATE DATABASE sales_system_db;

-- DROP ROLE IF EXISTS sales_system_db;

CREATE ROLE sales_system_db WITH LOGIN;

ALTER USER sales_system_db WITH PASSWORD 'salessystemdb';

\c sales_system_db;

CREATE TABLE items (
    id SERIAL NOT NULL PRIMARY KEY,
    menu_id INTEGER,
    price DECIMAL,
    name_eng VARCHAR(100) NOT NULL UNIQUE,
    name_chn VARCHAR(100) NOT NULL DEFAULT '',
    category INTEGER,
    special BOOLEAN DEFAULT FALSE
    -- custom BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE customers (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(15) UNIQUE,
    unit_number VARCHAR(5),
    street_number INTEGER,
    street_name VARCHAR(30),
    city VARCHAR(15),
    buzzer_number VARCHAR(5),
    address TEXT,
    note TEXT
);

CREATE TABLE orders_items (
    id SERIAL NOT NULL PRIMARY KEY,
    quantity INT,
    customizations jsonb,
    price DECIMAL,
    custom_price DECIMAL,
    custom_item_id VARCHAR(20),
    timestamp TIMESTAMP WITHOUT TIME ZONE
    --  item_id INT FOREIGN KEY REFERENCES items (id)
    --  order_id INT FOREIGN KEY REFERENCES orders (id)
);

CREATE TABLE orders (
    id SERIAL NOT NULL PRIMARY KEY,
    number INT,
    total DECIMAL,
    subtotal DECIMAL,
    gst DECIMAL,
    discount DECIMAL,
    timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW()),
    type SMALLINT,
    void BOOLEAN NOT NULL DEFAULT FALSE,
    paid BOOLEAN NOT NULL DEFAULT FALSE,
    internal BOOLEAN NOT NULL DEFAULT FALSE,
    internal_number INT,
    customizations jsonb,
    customizations_price DECIMAL
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
o.number as order_number,
o.timestamp as order_timestamp,
o.type as order_type,
o.total as order_total,
o.subtotal as order_subtotal,
o.gst as order_gst,
o.discount as order_discount,
o.void as order_void,
o.paid as order_paid,
o.internal as order_internal,
o.internal_number as order_internal_number,
o.customizations as order_customizations,
o.customizations_price as order_customizations_price,
c.id as customer_id,
c.name as customer_name,
c.phone as customer_phone,
c.address as customer_address,
c.street_name as customer_street_name,
c.street_number as customer_street_number,
c.unit_number as customer_unit_number,
c.buzzer_number as customer_buzzer_number,
c.note as customer_note,
i.id as item_id,
i.menu_id as item_menu_id,
i.category as item_category,
i.name_eng as item_name_eng,
i.name_chn as item_name_chn,
i.price as item_price,
i.special as item_special,
oi.custom_price as item_custom_price,
oi.custom_item_id as item_custom_id,
oi.quantity as orders_items_quantity,
oi.customizations as orders_items_customizations,
oi.timestamp as orders_items_timestamp,
(select sum(quantity) from orders_items where order_id = o.id group by order_id) as items_quantity_total
from orders_items oi 
LEFT JOIN items i ON oi.item_id = i.id
LEFT JOIN orders o ON oi.order_id = o.id
LEFT JOIN customers c ON o.customer_id = c.id;

CREATE OR REPLACE view orders_history
AS
SELECT
o.id as order_id,
o.number as order_number,
o.timestamp as order_timestamp,
o.type as order_type,
o.total as order_total,
o.void as order_void,
o.paid as order_paid,
o.internal as order_internal,
o.internal_number as order_internal_number,
o.customizations as order_customizations,
o.customizations_price as order_customizations_price,
c.id as customer_id,
c.name as customer_name,
c.phone as customer_phone
from orders o
LEFT JOIN customers c ON o.customer_id = c.id;

INSERT INTO customers (name, phone, address, unit_number, street_number, street_name, city)VALUES ('Table #1','0000000001',NULL,NULL,NULL,NULL,NULL);
INSERT INTO customers (name, phone, address, unit_number, street_number, street_name, city)VALUES ('Table #2','0000000002',NULL,NULL,NULL,NULL,NULL);
INSERT INTO customers (name, phone, address, unit_number, street_number, street_name, city)VALUES ('Table #3','0000000003',NULL,NULL,NULL,NULL,NULL);
INSERT INTO customers (name, phone, address, unit_number, street_number, street_name, city)VALUES ('Table #4','0000000004',NULL,NULL,NULL,NULL,NULL);
INSERT INTO customers (name, phone, address, unit_number, street_number, street_name, city)VALUES ('Table #5','0000000005',NULL,NULL,NULL,NULL,NULL);
INSERT INTO customers (name, phone, address, unit_number, street_number, street_name, city)VALUES ('Table #6','0000000006',NULL,NULL,NULL,NULL,NULL);
INSERT INTO customers (name, phone, address, unit_number, street_number, street_name, city)VALUES ('Table #7','0000000007',NULL,NULL,NULL,NULL,NULL);
INSERT INTO customers (name, phone, address, unit_number, street_number, street_name, city)VALUES ('Table #8','0000000008',NULL,NULL,NULL,NULL,NULL);
INSERT INTO customers (name, phone, address, unit_number, street_number, street_name, city)VALUES ('Table #9','0000000009',NULL,NULL,NULL,NULL,NULL);
INSERT INTO customers (name, phone, address, unit_number, street_number, street_name, city)VALUES ('Table #10','0000000010',NULL,NULL,NULL,NULL,NULL);
INSERT INTO customers (name, phone, address, unit_number, street_number, street_name, city)VALUES ('Table #11','0000000011',NULL,NULL,NULL,NULL,NULL);
INSERT INTO customers (name, phone, address, unit_number, street_number, street_name, city)VALUES ('Table #12','0000000012',NULL,NULL,NULL,NULL,NULL);

INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (1.00,'item1','饭1',1,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (2.00,'item2','饭2',2,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (3.00,'item3','饭3',3,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (4.00,'item4','饭4',4,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (5.00,'item5','饭5',5,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (6.00,'item6','饭6',6,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (7.00,'item7','饭7',7,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (8.00,'item8','饭8',8,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (9.00,'item9','饭9',9,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (10.00,'item10','饭10',10,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (11.00,'item11','饭11',11,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (12.00,'item12','饭12',12,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (13.00,'item13','饭13',13,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (14.00,'item14','饭14',14,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (15.00,'item15','饭15',15,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (16.00,'item16','饭16',16,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (17.00,'item17','饭17',17,22); 
INSERT INTO items (price, name_eng, name_chn, category, menu_id) VALUES (18.00,'item18','饭18',18,22); 
 