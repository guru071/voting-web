const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/datastore.html');
});

// handle form submit
app.post('/submit', (req, res) => {
  const {
    voter_name,
    voter_id,
    contact_no,
    aadhar_no,
    birth_date,
    age
  } = req.body;

  const sql = `
    INSERT INTO vote
    (voter_name, voter_id, contact_no, aadhar_no, birth_date, age)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [voter_name, voter_id, contact_no, aadhar_no, birth_date, age],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.send('Error saving data');
      }
      res.send('Form submitted successfully ✅');
    }
  );
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
