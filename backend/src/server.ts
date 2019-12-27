import lowdb = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");
import express, { request, response } from "express";
import * as bodyParser from "body-parser";
import App from "./app";
import PostsController from "./todos/todos.controller";

const app = new App([new PostsController()], 5000);

app.listen();
