import { Component, OnInit } from "@angular/core";
import { TodoItemService, TaskPriority } from "../services/todo-item.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent implements OnInit {
  todoItems = [];
  addTodoShown = false;
  constructor(
    private todoItemService: TodoItemService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getTodoItems();
  }

  getTodoItems() {
    this.todoItemService.get().subscribe(todoItems => {
      this.todoItems = todoItems;
    });
  }

  onTodoItemDelete(todoItem) {
    this.todoItemService.delete(todoItem).subscribe(() => {
      this.getTodoItems();
    });
  }

  onTodoItemUpdate(todoItem) {
    this.addTodoShown = true;
    this.todoItemService.setTodoItem(todoItem);
  }

  onTodoItemFinish(todoItem) {
    console.log(todoItem);
    this.todoItemService.update(todoItem).subscribe(respone => {
      window.location.reload();
    });
  }

  setAddTodoState(event: boolean) {
    this.addTodoShown = event;
  }
}
