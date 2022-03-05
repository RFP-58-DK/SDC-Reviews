const axios = require('axios');
const connection = require('../../db/connection.js')

const getReviews = (params, callback) => {
  let query = 'SELECT * FROM reviews LIMIT 5';
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