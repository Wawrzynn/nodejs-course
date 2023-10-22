// const responseHandler = require("./response-handler");
// const express = require("express");
import express from "express";
import responseHandler from "./response-handler.js";

const app = express();

app.get("/", responseHandler);

app.listen(3000);
