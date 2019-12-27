import * as express from "express";
import { TodoElement } from "./todos.interface";

class TodoController {
  public path = "/todos";
  public router = express.Router();

  private todos: TodoElement[] = [
    {
      category: "new",
      name: "test",
      description: "new test",
      assignee: "no one",
      priority: 1,
      isFinished: false,
      id: 0
    }
  ];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path + "/all", this.getAllTodos);
    this.router.post(this.path + "/add", this.createTodo);
    this.router.post(this.path + "/update", this.updateTodo);
    this.router.post(this.path + "/delete", this.deleteTodo);
  }

  getAllTodos = (request: express.Request, response: express.Response) => {
    response.send(this.todos);
  };

  createTodo = (request: express.Request, response: express.Response) => {
    const todo: TodoElement = request.body;
    this.todos.push(todo);
    response.send(todo);
  };

  updateTodo = (request: express.Request, response: express.Response) => {
    const todo: TodoElement = request.body;
    this.todos.push(todo);
    response.send(todo);
  };

  deleteTodo = (request: express.Request, response: express.Response) => {
    const todo: TodoElement = request.body;
    this.todos.push(todo);
    response.send(todo);
  };
}

export default TodoController;
