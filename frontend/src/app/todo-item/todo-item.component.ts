import { Component, Input, Output, EventEmitter } from "@angular/core";
import {
  faArrowUp,
  faArrowRight,
  faArrowDown,
  faTrashAlt
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
  @Output() finish = new EventEmitter();

  faArroWUp = faArrowUp;
  faArrowRight = faArrowRight;
  faArrowDown = faArrowDown;
  faTrashAlt = faTrashAlt;

  onDelete() {
    this.delete.emit(this.todoItem);
  }

  onUpdate() {
    this.update.emit(this.todoItem);
  }

  onFinish() {
    this.todoItem.isFinished = true;
    this.finish.emit(this.todoItem);
  }
}
