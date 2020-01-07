import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"]
})
export class TodoItemComponent {
  @Input() todoItem;
  @Output() delete = new EventEmitter();

  onDelete() {
    this.delete.emit(this.todoItem);
  }
}
