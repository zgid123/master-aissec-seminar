-- Demonstration & Discussion - Dynamic Data Masking in DuckDB
-- Run:
--   duckdb :memory: < pages/demonstration-and-discussion/demo.sql
--
-- This demonstrates masking behavior. It is not a complete security boundary.

DROP VIEW IF EXISTS masked_customers;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    id INTEGER,
    name VARCHAR,
    email VARCHAR,
    phone VARCHAR,
    credit_card VARCHAR,
    salary VARCHAR
);

INSERT INTO customers VALUES
    (1, 'Alice Smith', 'alice@gmail.com', '0901234567', '4111 1111 1111 1234', '50,000,000'),
    (2, 'Bob Tran', 'bob.tran@company.vn', '0987654321', '5500 0000 0000 9876', '42,000,000'),
    (3, 'Carol Nguyen', 'carol@bank.vn', '0911222333', '3400 000000 12345', '65,000,000');

CREATE OR REPLACE MACRO mask_email(value) AS
    CASE
        WHEN value IS NULL THEN NULL
        WHEN contains(value, '@') THEN left(value, 1) || '***@' || split_part(value, '@', 2)
        ELSE repeat('*', length(value))
    END;

CREATE OR REPLACE MACRO mask_phone(value) AS
    CASE
        WHEN value IS NULL THEN NULL
        WHEN length(value) <= 4 THEN repeat('*', length(value))
        ELSE repeat('*', length(value) - 4) || right(value, 4)
    END;

CREATE OR REPLACE MACRO mask_credit_card(value) AS
    CASE
        WHEN value IS NULL THEN NULL
        WHEN length(value) <= 4 THEN repeat('*', length(value))
        ELSE '**** **** **** ' || right(value, 4)
    END;

CREATE OR REPLACE MACRO mask_salary(value) AS
    CASE
        WHEN value IS NULL THEN NULL
        ELSE '********'
    END;

CREATE VIEW masked_customers AS
SELECT
    id,
    name,
    mask_email(email) AS email,
    mask_phone(phone) AS phone,
    mask_credit_card(credit_card) AS credit_card,
    mask_salary(salary) AS salary
FROM customers;

CREATE OR REPLACE MACRO customers_for(access_role) AS TABLE
SELECT
    id,
    name,
    CASE WHEN access_role = 'privileged' THEN email ELSE mask_email(email) END AS email,
    CASE WHEN access_role = 'privileged' THEN phone ELSE mask_phone(phone) END AS phone,
    CASE WHEN access_role = 'privileged' THEN credit_card ELSE mask_credit_card(credit_card) END AS credit_card,
    CASE WHEN access_role = 'privileged' THEN salary ELSE mask_salary(salary) END AS salary
FROM customers;

SELECT 'PRIVILEGED USER - ORIGINAL DATA' AS demo_step;
SELECT * FROM customers_for('privileged');

SELECT 'RESTRICTED USER - MASKED DATA' AS demo_step;
SELECT * FROM customers_for('restricted');

SELECT 'LIMITATION - DIRECT TABLE ACCESS BYPASSES MASKING' AS demo_step;
SELECT * FROM customers;
