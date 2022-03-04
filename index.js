const express = require('express');
const app = express();

const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

app.get('/reviews/', (req, res) => {
  res.send('reviews response here')
});

app.post('/reviews', (req, res) => {
  let body = req.body;
  console.log(body.foo); // UPDATE ME
  res.send(body.foo); // UPDATE ME
});