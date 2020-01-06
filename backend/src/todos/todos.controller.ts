import * as express from "express";
import { TodoElement } from "./todos.interface";
import TodoModel from "./todos.model";

class TodoController {
  public path = "/todos";
  public router = express.Router();
  private model: TodoModel;

  constructor() {
    this.intializeRoutes();
    this.model = new TodoModel();
  }

  public intializeRoutes() {
    this.router.get(this.path + "/all", this.getAllTodos);
    this.router.post(this.path + "/add", this.createTodo);
    this.router.post(this.path + "/update", this.updateTodo);
    this.router.post(this.path + "/delete", this.deleteTodo);
  }

  getAllTodos = (request: express.Request, response: express.Response) => {
    response.send(this.model.getAllTodos());
  };

  createTodo = (request: express.Request, response: express.Response) => {
    const todo: TodoElement = request.body;
    this.model.addTodo(todo);
    response.send(todo);
  };

  updateTodo = (request: express.Request, response: express.Response) => {
    const todo: TodoElement = request.body;
    this.model.updateTodo(todo);
    response.send(todo);
  };

  deleteTodo = (request: express.Request, response: express.Response) => {
    const todo: TodoElement = request.body;
    this.model.deleteTodo(todo.id);
    response.send(todo);
  };
}

export default TodoController;
