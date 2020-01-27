import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TaskPriority } from "../services/todo-item.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  faArrowUp,
  faArrowRight,
  faArrowDown
} from "@fortawesome/free-solid-svg-icons";

import { TodoElement, TodoItemService } from "../services/todo-item.service";

@Component({
  selector: "app-add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.css"]
})
export class AddTodoComponent implements OnInit {
  @Input() hidden: boolean;
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  priorityItems: { id: number; name: string }[] = [];
  todoItemForm: FormGroup;
  categoryItems = ["Personal", "Professional", "Finance"];

  faArroWUp = faArrowUp;
  faArrowRight = faArrowRight;
  faArrowDown = faArrowDown;


  constructor(
    private todoItemService: TodoItemService,
    private formBuilder: FormBuilder
  ) {
    this.transformTaskPriority();
  }

  private transformTaskPriority() {
    for (const n in TaskPriority) {
      if (typeof TaskPriority[n] === "number") {
        this.priorityItems.push({ id: TaskPriority[n] as any, name: n });
      }
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  onCancel() {
    this.cancelEvent.emit(false);
    this.hidden = true;
    this.todoItemForm.reset();
  }

  private buildForm() {
    this.todoItemForm = this.formBuilder.group({
      category: this.formBuilder.control("", [Validators.required]),
      name: this.formBuilder.control("", [Validators.required]),
      description: this.formBuilder.control("", [Validators.required]),
      assignee: this.formBuilder.control("", [Validators.required]),
      priority: this.formBuilder.control("", [Validators.required])
    });
  }

  onSubmit() {
    const todoItem: TodoElement = {
      category: this.todoItemForm.get("category").value,
      name: this.todoItemForm.get("name").value,
      description: this.todoItemForm.get("description").value,
      assignee: this.todoItemForm.get("assignee").value,
      priority: this.todoItemForm.get("priority").value,
      isFinished: false,
      id: 0
    };

    this.todoItemService.add(todoItem).subscribe(response => {
      this.onCancel();
      window.location.reload();
    });
    console.log("Submitted successfully.");
  }

  get form() {
    return this.todoItemForm.controls;
  }
}
