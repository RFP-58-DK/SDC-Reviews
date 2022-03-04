DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews;

CREATE TABLE reviews (
 id BIGSERIAL PRIMARY KEY,
 product_id SERIAL,
 rating INTEGER,
 date BIGINT,
 summary TEXT,
 body TEXT,
 recommend BOOLEAN,
 reported BOOLEAN,
 reviewer_name TEXT,
 reviewer_email TEXT,
 response TEXT,
 helpfulness INTEGER
);

CREATE TABLE characteristics (
 id BIGSERIAL PRIMARY KEY,
 product_id SERIAL,
 name TEXT
);

CREATE TABLE characteristic_reviews (
 id BIGSERIAL PRIMARY KEY,
 characteristic_id INTEGER,
 review_id SERIAL,
 value INTEGER
);

CREATE TABLE reviews_photos (
 id BIGSERIAL PRIMARY KEY,
 review_id INTEGER,
 url TEXT
);

ALTER TABLE characteristic_reviews ADD CONSTRAINT characteristic_reviews_characteristic_id_fkey FOREIGN KEY (characteristic_id) REFERENCES characteristics(id);
ALTER TABLE characteristic_reviews ADD CONSTRAINT characteristic_reviews_review_id_fkey FOREIGN KEY (review_id) REFERENCES reviews(id);
ALTER TABLE reviews_photos ADD CONSTRAINT reviews_photos_review_id_fkey FOREIGN KEY (review_id) REFERENCES reviews(id);
