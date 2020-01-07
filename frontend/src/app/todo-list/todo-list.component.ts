import { Component, OnInit } from "@angular/core";
import { TodoItemService } from "../todo-item/todo-item.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent implements OnInit {
  todoItems = [];
  constructor(private todoItemService: TodoItemService) {}

  ngOnInit() {
    this.getTodoItems();
  }

  getTodoItems() {
    this.todoItemService.get().subscribe(todoItems => {
      this.todoItems = todoItems;
    });
    console.log("This are the items: ", this.todoItems);
  }

  onTodoItemDelete(todoItem) {
    this.todoItemService.delete(todoItem).subscribe(() => {
      this.getTodoItems();
    });
  }
}
