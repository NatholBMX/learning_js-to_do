import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { TodoItemService, TodoElement } from "../services/todo-item.service";
import { Router } from "@angular/router";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent implements OnInit, OnChanges {
  @Input() filterValue;
  todoItems = [];
  addTodoShown = false;

  faPlus = faPlus;

  constructor(
    private todoItemService: TodoItemService,
    public router: Router
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    this.getTodoItems();
  }

  getTodoItems() {
    this.todoItemService.get().subscribe(todoItems => {
      this.todoItems = todoItems;
      if (this.filterValue === "Home") {
        this.filterValue = null;
      }
      if (this.filterValue) {
        this.filterTodoItems();
      }
    });
  }

  filterTodoItems() {
    this.todoItems = this.todoItems.filter(
      (todo: TodoElement) => todo.category === this.filterValue
    );
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
