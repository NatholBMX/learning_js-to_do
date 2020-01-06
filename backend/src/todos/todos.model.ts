import lowdb = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");
import { TodoElement, TaskPriority } from "./todos.interface";
import shortid = require("shortid");

class TodoModel {
    public database: lowdb;
    constructor() {
        this.connectToDatabase();
    }

    private connectToDatabase() {
        const dbfile = "./data/data.json";
        const adapter = new FileSync(dbfile);
        this.database = new lowdb(adapter);
    }

    public getAllTodos() {
        return this.database.get("todos").value();
    }

    public addTodo(todoElement: TodoElement) {
        todoElement.id = shortid.generate();
        this.database.get("todos").push(todoElement).write();

    }

    public deleteTodo(itemId: number) {
        this.database.get("todos").remove({ id: itemId }).write();
    }

    public updateTodo(todoElement: TodoElement) {
        this.database.get("todos").find({ id: todoElement.id }).assign(todoElement).write();
    }
}

export default TodoModel;