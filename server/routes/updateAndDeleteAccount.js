const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../config/connection");

const router = express.Router();

router.put("/update-password", async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({
      message: "Email, current password, and new password are required",
    });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email], async (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];
    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    const updateSql = "UPDATE users SET password = ? WHERE email = ?";
    connection.query(updateSql, [hashedNewPassword, email], (err) => {
      if (err) {
        console.error("Error updating password:", err);
        return res.status(500).json({ message: "Failed to update password" });
      }

      res.status(200).json({ message: "Password updated successfully" });
    });
  });
});

router.delete("/delete-account", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const sql = "DELETE FROM users WHERE email = ?";
  connection.query(sql, [email], (err) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ message: "Failed to delete account" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  });
});

module.exports = router;
