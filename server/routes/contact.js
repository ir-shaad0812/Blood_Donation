const express = require("express");
const connection = require("../config/connection");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sql =
      "INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)";
    connection.query(sql, [name, email, subject, message], (err, result) => {
      if (err) {
        console.error("Error inserting contact:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(201).json({
        message: "Thank you for your message! We will get back to you soon.",
        contactId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
