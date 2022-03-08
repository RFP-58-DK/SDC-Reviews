const axios = require('axios');
const connection = require('../../db/connection.js')

const getReviews = (params, callback) => {
  const query = `
    SELECT
      r.id AS review_id,
      r.rating,
      r.summary,
      r.recommend,
      r.response,
      r.body,
      r.date,
      r.reviewer_name,
      r.helpfulness,
      json_agg(
        json_build_object(
          'id', p.id,
          'url', p.url
        )
      ) AS photos
    FROM reviews AS r
    JOIN reviews_photos AS p
    ON r.id = p.review_id
    WHERE product_id = ${params.product_id}
    GROUP BY r.id
    LIMIT ${params.count || 5} OFFSET ${(params.page - 1) * params.count || 0}
  `;
  connection.query(query, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.rows);
    }
  })
};

const getReviewsRating = (params, callback) => {
  const query = `
  SELECT
    r.product_id,
    json_build_object(
      r.rating,
      count(
        r.rating
      )
    ) AS ratings,
    r.recommend
  FROM reviews AS r
  WHERE r.product_id = ${params.product_id}
  GROUP BY r.product_id, r.rating, r.recommend;
  `;
  connection.query(query, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.rows);
    }
  })
};

const getReviewsCharacteristics = (params, callback) => {
  const query = `
  SELECT
    c.*,
    cr.review_id,
    cr.value
  FROM characteristics AS c
  JOIN characteristic_reviews AS cr
  ON c.id = cr.characteristic_id
  WHERE c.product_id = ${params.product_id};
  `;
  connection.query(query, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.rows);
    }
  })
}

/*const putReviewHelpful = (params, callback) => {
  const route = API + `reviews/${params.review_id}/helpful`;
  axios.put(route, null, {headers:
    {authorization: TOKEN}, params: params})
  .then((res) => {
    callback(null, res.data)
  })
  .catch((err) => {
    callback(err);
  })
};

const putReviewReport = (params, callback) => {
  const route = API + `reviews/${params.review_id}/helpful`;
  axios.put(route, null, {headers:
    {authorization: TOKEN}, params: params})
  .then((res) => {
    callback(null, res.data)
  })
  .catch((err) => {
    callback(err);
  })
};

const postReviews = (params, callback) => {
  const route = API + `reviews/`;
  axios.post(route, params, {headers:
    {authorization: TOKEN}})
  .then((res) => {
    callback(null, res.data)
  })
  .catch((err) => {
    callback(err);
  })
};*/

module.exports = {
  getReviews,
  getReviewsRating,
  getReviewsCharacteristics/*,
  putReviewHelpful,
  putReviewReport,
  postReviews*/
}
