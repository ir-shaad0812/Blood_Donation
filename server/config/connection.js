var mysql = require("mysql2");

// Create a connection pool
var connection = mysql.createPool({
  host: "127.0.0.1", // or "localhost"
  user: "root",
  password: "",
  database: "blooddonation",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

connection.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL Database");
    conn.release();
  }
});

module.exports = connection;
