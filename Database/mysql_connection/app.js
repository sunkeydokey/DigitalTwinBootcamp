import mysql from 'mysql2';

const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'sunnydayday14!',
  database: 'house',
  port: '3306',
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
  const sql = `SELECT * FROM Object`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});
