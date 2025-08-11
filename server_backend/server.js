import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./src/Routes/userRoutes.js";
import https from "https";
import fs from "fs";
import connectDb from "./src/configDb/dbConnection.js";

//for using dotenv to bring variables from .envfile
dotenv.config();
// using express,then using cookie parser so cookies can b handled,and port
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT;

app.use(express.json());
connectDb();

//for reading from certs
const options = {
  key: fs.readFileSync("./certs/key.pem"),
  cert: fs.readFileSync("./certs/cert.pem"),
};
//user auth route
app.use("/api/userauth", userRoutes);

app.get("/", (req, res) => {
  res.send("Mubarak ho Server Cahl rhaa haai");
});

https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
