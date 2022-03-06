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
      json_build_object(
        'id', p.id,
        'url', p.url
      ) AS photos
    FROM reviews AS r LEFT JOIN reviews_photos AS p on r.id = p.review_id
    WHERE product_id = ${params.product_id}
    LIMIT ${params.count || 5}
  `;
  connection.query(query, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.rows);
    }
  })
};

/*const getReviewsMeta = (params, callback) => {
  const route = API + `reviews/meta`;
  axios.get(route, {headers:
    {authorization: TOKEN}, params: params})
  .then((res) => {
    callback(null, res.data)
  })
  .catch((err) => {
    callback(err);
  })
};

const putReviewHelpful = (params, callback) => {
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
  getReviews/*,
  getReviewsMeta,
  putReviewHelpful,
  putReviewReport,
  postReviews*/
}



// JOIN (
//   SELECT
//     rev.id AS photos,
//     array_agg(p.id, p.url) AS url_array
//   FROM reviews_photos AS p
//   JOIN reviews AS rev ON rev.id = p.review_id
//   GROUP BY rev.id
// ) p USING (id)