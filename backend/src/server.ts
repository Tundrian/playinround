//dist/server.js

// const express = require('express');
// const dotenv = require('dotenv');
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const connectDB = require("../config/db.ts");

dotenv.config();

connectDB()
// const app = express();
const app: Express = express();

// const port = process.env.PORT;
const port = process.env.PORT || 3000;
app.use('/api/samples', require('../routes/sampleRoutes'))
// app.get('/', (req, res) => {
app.get("/", (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get("/new", (req: Request, res: Response) => {
  res.send("new page found")
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
