import { Component, OnInit } from "@angular/core";
import { TodoItemService } from "../services/todo-item.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"]
})
export class CategoryListComponent implements OnInit {
  categoryList = [];
  constructor(private todoItemService: TodoItemService) {
    this.getCategories();
  }

  ngOnInit() {}

  getCategories() {
    this.todoItemService.get().subscribe(todoItems => {
      this.categoryList = [...new Set(todoItems.map(item => item.category))];
    });
  }
}
