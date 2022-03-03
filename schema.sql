DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews;

CREATE TABLE reviews (
  review_id SERIAL,
  product_id SERIAL UNIQUE,
  rating int,
  summary text,
  recommend boolean,
  response text,
  body text,
  "date" timestamp,
  reviewer_name text,
  reviewer_email text,
  helpfulness int,
  photos json,
  PRIMARY KEY (review_id)
);

CREATE TABLE ratings (
  ratings_id SERIAL,
  "1" int,
  "2" int,
  "3" int,
  "4" int,
  "5" int,
  PRIMARY KEY (ratings_id)
);

CREATE TABLE recommended (
  recommended_id SERIAL,
  "true" int,
  "false" int,
  PRIMARY KEY (recommended_id)
);

CREATE TABLE characteristics (
  characteristics_id SERIAL,
  characteristics json,
  PRIMARY KEY (characteristics_id)
);

CREATE TABLE meta (
  product_id SERIAL,
  ratings_id SERIAL,
  recommended_id SERIAL,
  characteristics_id SERIAL,
  FOREIGN KEY (product_id) REFERENCES reviews(product_id),
  FOREIGN KEY (ratings_id) REFERENCES ratings(ratings_id),
  FOREIGN KEY (recommended_id) REFERENCES recommended(recommended_id),
  FOREIGN KEY (characteristics_id) REFERENCES characteristics(characteristics_id)
);