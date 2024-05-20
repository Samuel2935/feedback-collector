const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userModel = require('./models/userModel');

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/users');

app.get('/', (req, res) => {
  userModel
    .find({})
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  userModel
    .findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(
      { _id: id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      }
    )
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => console.log(err));
});

app.post('/createUsers', (req, res) => {
  userModel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log('app listening to port 8080');
});
