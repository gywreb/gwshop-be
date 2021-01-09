const express = require("express");
const app = express();
require("dotenv").config();
require("colors");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ConnectMongoDB = require("./database/dbConnect");
const auth = require("./routes/auth");
const user = require("./routes/user");
const errorHandler = require("./middlewares/errorHandler");

ConnectMongoDB.getConnection();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);

app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port: ${port}`.cyan));
