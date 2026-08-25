CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  full_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  address VARCHAR NOT NULL,
  national_id VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS demo_accounts (
  username VARCHAR PRIMARY KEY,
  password_hash VARCHAR NOT NULL,
  token VARCHAR NOT NULL UNIQUE,
  display_name VARCHAR NOT NULL,
  role VARCHAR NOT NULL CHECK (role IN ('manager', 'support'))
);

CREATE OR REPLACE MACRO mask_email(value) AS
  CASE
    WHEN value IS NULL THEN NULL
    ELSE concat(left(value, 1), '***@', split_part(value, '@', 2))
  END;

CREATE OR REPLACE MACRO mask_phone(value) AS
  CASE
    WHEN value IS NULL THEN NULL
    ELSE '************'
  END;

CREATE OR REPLACE MACRO substitute_address(value) AS
  CASE WHEN value IS NULL THEN NULL ELSE '123 Đường Mẫu, TP.HCM' END;

CREATE OR REPLACE MACRO hash_national_id(value) AS
  CASE WHEN value IS NULL THEN NULL ELSE left(sha256(value), 12) END;

CREATE OR REPLACE MACRO users_for_role(viewer_role) AS TABLE
  SELECT
    id,
    full_name,
    CASE WHEN viewer_role = 'manager' THEN email
         WHEN viewer_role = 'support' THEN mask_email(email)
         ELSE NULL END AS email,
    CASE WHEN viewer_role = 'manager' THEN phone
         WHEN viewer_role = 'support' THEN mask_phone(phone)
         ELSE NULL END AS phone,
    CASE WHEN viewer_role = 'manager' THEN address
         WHEN viewer_role = 'support' THEN substitute_address(address)
         ELSE NULL END AS address,
    CASE WHEN viewer_role = 'manager' THEN national_id
         WHEN viewer_role = 'support' THEN hash_national_id(national_id)
         ELSE NULL END AS national_id,
    created_at
  FROM users;
