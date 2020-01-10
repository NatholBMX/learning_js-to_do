import { Component, OnInit } from "@angular/core";
import { TodoItemService } from "../services/todo-item.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent implements OnInit {
  todoItems = [];
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
}
