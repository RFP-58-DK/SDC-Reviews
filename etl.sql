\c reviews

COPY reviews
FROM '/home/skipdawg3000/hackreactor/repos/SDC-Reviews/csv-data/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics
FROM '/home/skipdawg3000/hackreactor/repos/SDC-Reviews/csv-data/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY characteristic_reviews
FROM '/home/skipdawg3000/hackreactor/repos/SDC-Reviews/csv-data/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

COPY reviews_photos
FROM '/home/skipdawg3000/hackreactor/repos/SDC-Reviews/csv-data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;
