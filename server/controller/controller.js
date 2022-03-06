const Model = require('../model/model.js');

const getReviews = (req, res) => {
  const params = req.query;
  Model.getReviews(params, (err, reviews) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const response = {
        product: params.product_id,
        page: params.page || 0,
        count: params.count || 5,
        results: reviews
      }
      res.status(200).send(response);
    }
  })
};

const getReviewsMeta = (req, res) => {
  const params = req.query;
  Model.getReviewsMeta(params, (err, reviews) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(reviews);
    }
  })
};

const putReviewHelpful = (req, res) => {
  const params = req.body.params;

  Model.putReviewHelpful(params, (err, reviews) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send();
    }
  })
}

const postReviews = (req, res) => {
  const params = req.body;
  Model.postReviews(params, (err, reviews) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send();
    }
  })
}

module.exports = {
  getReviews,
  getReviewsMeta,
  putReviewHelpful,
  postReviews
}