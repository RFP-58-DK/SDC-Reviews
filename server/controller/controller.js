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
      for (let i = 0; i < response.results.length; i ++) {
        let d = new Date(parseInt(response.results[i].date));
        response.results[i].date = d;
        response.results[i].review_id = parseInt(response.results[i].review_id);
      }
      res.status(200).send(response);
    }
  })
};

const getReviewsMeta = (req, res) => {
  const params = req.query;
  let response = {
    product_id: params.product_id,
    ratings: {},
    recommended: {
      false: 0,
      true: 0
    },
    characteristics: {}
  };
  Model.getReviewsRating(params, (err, reviews) => {
    if (err) {
      res.status(500).send(err);
    } else {
      for (let i = 0; i < reviews.length; i++) {
        for (let keys in reviews[i].ratings) {
          if (response.ratings[keys] === undefined) {
            response.ratings[keys] = reviews[i].ratings[keys].toString();
          }
        }
        if (reviews[i].recommend === true) {
          response.recommended.true++;
        } else if (reviews[i].recommend === false) {
          response.recommended.false++;
        }
      }
      response.recommended.true = response.recommended.true.toString();
      response.recommended.false = response.recommended.false.toString();
      Model.getReviewsCharacteristics(params, (err, characteristics) => {
        if (err) {
          res.status(500).send(err);
        } else {
          let averageScore = {};
          for (let i = 0; i < characteristics.length; i++) {
            if (averageScore[characteristics[i].name] === undefined) {
              averageScore[characteristics[i].name] = [];
            }
            averageScore[characteristics[i].name].push(characteristics[i].value);
            if (response.characteristics[characteristics[i].name] === undefined) {
              response.characteristics[characteristics[i].name] = {
                id: parseInt(characteristics[i].id),
                value: 0
              };
            }
            let scoreSum = averageScore[characteristics[i].name].reduce((memo, item) => memo + item, 0);
            let scoreCount = averageScore[characteristics[i].name].length;
            let scoreAve = (scoreSum / scoreCount).toPrecision(17);
            response.characteristics[characteristics[i].name].value = scoreAve.toString();
          }
          res.status(200).send(response);
        }
      })
    }
  })
};

/*const putReviewHelpful = (req, res) => {
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
}*/

module.exports = {
  getReviews,
  getReviewsMeta/*,
  putReviewHelpful,
  postReviews*/
}