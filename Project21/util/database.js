const mysql = require("mysql2");

const pool = mysql.createPool({
  port: "3306",
  host: "localhost",
  user: "root",
  database: "node_db",
  password: "Lewandowski10@",
});

module.exports = pool.promise();