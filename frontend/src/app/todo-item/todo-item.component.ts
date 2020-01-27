import { Component, Input, Output, EventEmitter } from "@angular/core";
import {
  faArrowUp,
  faArrowRight,
  faArrowDown
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"]
})
export class TodoItemComponent {
  @Input() todoItem;
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  faArroWUp = faArrowUp;
  faArrowRight = faArrowRight;
  faArrowDown = faArrowDown;

  onDelete() {
    this.delete.emit(this.todoItem);
  }

  onUpdate() {}
}
