const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../config/connection");

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email], async (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result[0];

    try {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        res.json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error comparing password:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

module.exports = router;
