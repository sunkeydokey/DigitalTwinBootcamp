import express from 'express';
import mysql from 'mysql2';

const app = express();

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'sunnydayday14!',
  database: 'mydb',
});

app.set('port', process.env.PORT || 8081);
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

app.post('/input', (req, res) => {
  const text = req.body.textInput.toUpperCase();
  if (!(text === 'I' || text === 'D' || text === 'U' || text === 'S')) {
    return res.redirect('/');
  }
  if (text === 'I') {
    connection.connect(function (err) {
      if (err) throw err;
      const sql = `INSERT INTO input(text, time) VALUES('${text}', now())`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log('DATA inserted!');
      });
    });
  }
  if (text === 'D') {
    connection.connect(function (err) {
      if (err) throw err;
      const sql = `DELETE FROM input ORDER BY time DESC LIMIT 1`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log('DATA deleted!');
      });
    });
  }
  if (text === 'U') {
    connection.connect(function (err) {
      if (err) throw err;
      const sql = `UPDATE input SET text = 'U', time = now() WHERE time = (SELECT time FROM (SELECT time FROM input ORDER BY time DESC LIMIT 1) AS temp)`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log('DATA updated!');
      });
    });
  }

  if (text === 'S') {
    connection.connect(function (err) {
      if (err) throw err;
      const sql = `SELECT * FROM input`;
      connection.query(sql, async function (err, result) {
        if (err) throw err;
        console.log(...result);

        const arr = result.map((obj) => obj.text);
        console.log(arr);
        const someText = arr.join(',');
        console.log(someText);
      });
    });
  }

  return res.redirect('/');
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
