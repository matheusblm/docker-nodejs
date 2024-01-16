const express = require("express");
const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "node_mysql",
};

const mysql = require("mysql");
const connection = mysql.createConnection(config);
const sqlCreateTable = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`;
connection.query(sqlCreateTable);

app.get("/", async (req, res) => {
  const sql = `INSERT INTO people(name) values('Matheus')`;
  connection.query(sql);

  const sql2 = `SELECT * FROM people`;

  connection.query(sql2, (err, result) => {
    if (err) throw err;

    let people = "";
    result.forEach((person) => {
      people += `<li>${person.name}</li>`;
    });

    const responseHtml = `<h1>Full Cycle Rocks</h1><ul>${people}</ul>`;
    res.send(responseHtml);
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
