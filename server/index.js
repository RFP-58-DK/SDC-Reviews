const express = require('express');
const app = express();
const port = 3000;
const Controller = require('./controller/controller.js');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

app.get('/reviews/', (req, res) => {
  Controller.getReviews(req, res);
});

app.get('/reviews/meta', (req, res) => {
  Controller.getReviewsMeta(req, res);
});

/*app.put('/reviews/:review_id/helpful', (req, res) => {
  Controller.putReviewHelpful(req, res);
});

app.post('/reviews/', (req, res) => {
  Controller.postReviews(req, res);
});*/
