const express = require("express");
const app = express();
require("dotenv").config();
require("colors");
const ConnectMongoDB = require("./database/dbConnect");
const errorHandler = require("./middlewares/errorHandler");

ConnectMongoDB.getConnection();

app.use(express.json());

app.use(errorHandler);
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port: ${port}`.cyan));
