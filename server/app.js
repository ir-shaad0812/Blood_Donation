const express = require("express");
const cors = require("cors");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const donorRouter = require("./routes/donor");
const bloodRequestRouter = require("./routes/bloodrequest");
const userUpdateAndDeleteAccount = require("./routes/updateAndDeleteAccount");
const contactRouter = require("./routes/contact");

// cors origins options
const corsOptions = {
  methods: "GET,POST,PUT,DELETE",
  origin: "http://localhost:5173",
  allowedHeaders: ["Content-Type", "Authorization"],
};

const server = express();
server.use(cors(corsOptions));
server.use(express.json());

// router
server.use("/api/login", loginRouter);
server.use("/api/register", registerRouter);
server.use("/api/donor", donorRouter);
server.use("/api/blood-request", bloodRequestRouter);
server.use("/api/user", userUpdateAndDeleteAccount);
server.use("/api/contact", contactRouter);

const PORT = 3000;

// Listening PORT
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
