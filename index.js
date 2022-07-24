const express = require('express');
const app = express();

const init = () => {
  try {
    app.listen(4000, () => console.log('listening on port 4000'));
  } catch (error) {
    console.log(error);
  }
};

init();

//curl localhost:4000/set?somekey=somevalue
//curl localhost:4000/get?key=somekey

let savedData = {};

app.get('/set', (req, res, next) => {
  try {
    savedData = { ...savedData, ...req.query };
    res.status(201).send(savedData);
  } catch (error) {
    next(error);
  }
});

app.get('/get', (req, res, next) => {
  try {
    const response = savedData[req.query.key];
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});
