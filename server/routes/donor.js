const express = require("express");
const connection = require("../config/connection");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      bloodGroup,
      age,
      weight,
      lastDonation,
      address,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !bloodGroup ||
      !age ||
      !weight ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (age < 18 || age > 65) {
      return res.status(400).json({ message: "Age must be between 18 and 65" });
    }

    if (weight < 45) {
      return res.status(400).json({ message: "Weight must be at least 45 kg" });
    }

    const sql =
      "INSERT INTO donors (name, email, phone, bloodGroup, age, weight, lastDonation, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [name, email, phone, bloodGroup, age, weight, lastDonation, address],
      (err, result) => {
        if (err) {
          console.error("Error inserting donor:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({
          message: "Donor registered successfully",
          donorId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
