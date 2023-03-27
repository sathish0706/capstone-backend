require("dotenv").config();
const express = require("express");
const cors = require("cors");
const database = require("./Database/connect");
const cookieParser = require("cookie-parser");
const userAuth = require("./Routes/userAuth.routes");
const users = require("./Routes/users.routes");
const query = require("./Routes/query.routes");
const capstone = require("./Routes/capstone.routes");

const app = express();

database();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("Wellcome to my app");
  res.status(200).send("Wellcome to my app");
});

app.use("/api", userAuth);
app.use("/api", users);
app.use("/api", query);
app.use("/api", capstone);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
