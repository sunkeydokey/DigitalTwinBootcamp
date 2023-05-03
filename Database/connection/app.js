// import mongoose from 'mongoose';
// import User from './models/User.js';

// mongoose.connect('mongodb://localhost/testdb');

// run();
// async function run() {
//   try {
//     const user = await User.where('age')
//       .gt(20)
//       .lt(40)
//       .where('name')
//       .equals('Park');
//     console.log(user);
//   } catch (e) {
//     console.log(e.message);
//   }
// }

// 초기화 app && 미들웨어
import express from 'express';
import database from './database/db.js';
import { ObjectId } from 'mongodb';

const { connectToDb, getDb } = database;

const app = express();

let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('port 3000 작동중');
    });
    db = getDb();
  }
});

// routes
app.get('/books', (req, res) => {
  let books = [];

  db.collection('books')
    .find()
    .sort({ author: 1 })
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch the documents' });
    });
});

app.get('/books/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Could not fetch the document' });
      });
  } else {
    res.status(500).json({ error: 'Could not fetch the document' });
  }
});
