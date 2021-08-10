const express = require('express');
const path = require('path');
const randomId = require('random-id');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

// place holder for the data
const users = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/dist')));

app.get('/api/users', (req, res) => {
  console.log('api/users called')
  res.json(users);
});

app.post('/api/error', (req, res) => {
  console.log('api/error called')
  const err = req.body.error;
  const info = req.body.information;
  const stack = req.body.stack;
  console.log(`\nMy Error: ${err}\nInfo: ${info}\n Error Stack: ${stack}\n\n`)
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  user.id = randomId(10);
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user added");
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});