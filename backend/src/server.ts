// Load HTTP module
/*
import http from "http";
import express from "express";

const hostname = "127.0.0.1";
const port = 8000;

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Send the response body "Hello World"
  res.end("Hello World\n");
});

// Prints a log once the server starts listening
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

import FileHandler from "./file-loader";
import { TodoElement, TaskPriority } from "./todo-element";

var fileHandler = new FileHandler("./data/temp.json");
var jsonData = fileHandler.readFile();
console.log("this is the file data:" + jsonData);

var todo: TodoElement = {
  category: "new",
  name: "test",
  description: "new test",
  assignee: "no one",
  priority: TaskPriority.High,
  isFinished: false,
  id: 0
};

var todoList = [];
todoList.push(todo);
todoList.push(todo);

fileHandler.writeFile(todoList);
