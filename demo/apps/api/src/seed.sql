INSERT INTO users
SELECT
  (i + 1)::INTEGER AS id,
  concat(
    list_extract(['An', 'Binh', 'Chi', 'Dung', 'Giang', 'Ha', 'Khanh', 'Linh', 'Minh', 'Phuong'], ((i * 17) % 10 + 1)::INTEGER),
    ' ',
    list_extract(['Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Huynh', 'Phan', 'Vu', 'Vo', 'Dang'], ((i * 7) % 10 + 1)::INTEGER),
    ' #', lpad(i::VARCHAR, 7, '0')
  ) AS full_name,
  concat(
    lower(list_extract(['an', 'binh', 'chi', 'dung', 'giang', 'ha', 'khanh', 'linh', 'minh', 'phuong'], ((i * 17) % 10 + 1)::INTEGER)),
    '.',
    lower(list_extract(['nguyen', 'tran', 'le', 'pham', 'hoang', 'huynh', 'phan', 'vu', 'vo', 'dang'], ((i * 7) % 10 + 1)::INTEGER)),
    lpad(i::VARCHAR, 7, '0'),
    list_extract(['@example.com', '@mail.vn', '@company.io', '@duckdb.dev'], ((i * 13) % 4 + 1)::INTEGER)
  ) AS email,
  concat('+84', lpad((900000000 + (i % 99999999))::VARCHAR, 9, '0')) AS phone,
  concat(
    ((i % 499) + 1)::VARCHAR, ' ',
    list_extract(['Nguyen Hue', 'Le Loi', 'Tran Hung Dao', 'Hai Ba Trung', 'Vo Van Tan'], ((i * 3) % 5 + 1)::INTEGER),
    ', ',
    list_extract(['Ho Chi Minh City', 'Ha Noi', 'Da Nang', 'Can Tho', 'Hue'], ((i * 11) % 5 + 1)::INTEGER)
  ) AS address,
  lpad((790000000000 + i)::VARCHAR, 12, '0') AS national_id,
  TIMESTAMP '2023-01-01 08:00:00' + (i % 1000) * INTERVAL '1 day' AS created_at
FROM range(1000000) AS generated(i);

ANALYZE users;
