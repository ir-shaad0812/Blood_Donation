const express = require("express");
const connection = require("../config/connection");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, bloodGroup, hospital, address } = req.body;

    if (!name || !email || !phone || !bloodGroup || !hospital || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sql =
      "INSERT INTO blood_requests (name, email, phone, blood_group, hospital, address) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(
      sql,
      [name, email, phone, bloodGroup, hospital, address],
      (err, result) => {
        if (err) {
          console.error("Error inserting blood request:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({
          message: "Blood request submitted successfully",
          requestId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
