import { MongoClient } from 'mongodb';

let dbConnetion;
const db = {
  connectToDb: (cb) => {
    MongoClient.connect('mongodb://localhost:27017/bookstore')
      .then((client) => {
        dbConnetion = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },

  getDb: () => dbConnetion,
  // getDb:()=> {
  //   console.log("-------")
  //   console.log(dbConnetion) 리턴 DB connection
  // }
};
export default db;
