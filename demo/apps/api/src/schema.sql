CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  full_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  address VARCHAR NOT NULL,
  national_id VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE OR REPLACE MACRO mask_email(value) AS
  CASE
    WHEN value IS NULL THEN NULL
    ELSE concat(left(value, 1), '***@', split_part(value, '@', 2))
  END;

CREATE OR REPLACE MACRO mask_phone(value) AS
  CASE
    WHEN value IS NULL THEN NULL
    ELSE concat(left(value, 3), '•••••', right(value, 3))
  END;

CREATE OR REPLACE MACRO mask_address(value) AS
  CASE WHEN value IS NULL THEN NULL ELSE concat('••••, ', split_part(value, ', ', 2)) END;

CREATE OR REPLACE MACRO mask_national_id(value) AS
  CASE WHEN value IS NULL THEN NULL ELSE concat('••••••••', right(value, 4)) END;

CREATE OR REPLACE MACRO users_for_role(viewer_role) AS TABLE
  SELECT
    id,
    full_name,
    CASE WHEN viewer_role = 'admin' THEN email
         WHEN viewer_role = 'user' THEN mask_email(email)
         ELSE NULL END AS email,
    CASE WHEN viewer_role = 'admin' THEN phone
         WHEN viewer_role = 'user' THEN mask_phone(phone)
         ELSE NULL END AS phone,
    CASE WHEN viewer_role = 'admin' THEN address
         WHEN viewer_role = 'user' THEN mask_address(address)
         ELSE NULL END AS address,
    CASE WHEN viewer_role = 'admin' THEN national_id
         WHEN viewer_role = 'user' THEN mask_national_id(national_id)
         ELSE NULL END AS national_id,
    created_at
  FROM users;
