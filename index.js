const express = require("express");
const { connection } = require("./config/db");
const path = require("path");
const rootRoutes = require("./routes/root");
const { errorHandler } = require("./middlewares/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const bookRoutes = require("./routes/book");
const bookRouters = require("./routes/count");

const PORT = process.env.PORT || 4500;

const app = express();
app.use(express.static("public"));

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/", rootRoutes);
app.use("/book", bookRoutes);
app.use('/count', bookRouters);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, async() => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server running on port ${PORT}`)
});
