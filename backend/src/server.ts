//dist/server.js

// const express = require('express');
// const dotenv = require('dotenv');
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

// const app = express();
const app: Express = express();

// const port = process.env.PORT;
const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
app.get("/", (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
