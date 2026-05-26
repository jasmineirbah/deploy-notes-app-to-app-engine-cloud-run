const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "34.172.113.167",
  user: "admin",
  password: "mypassword",
  database: "notes_123230029"
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;