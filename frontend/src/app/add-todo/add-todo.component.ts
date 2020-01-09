import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { TaskPriority } from "../todo-item/todo-item.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { TodoElement, TodoItemService } from "../todo-item/todo-item.service";

@Component({
  selector: "app-add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.css"]
})
export class AddTodoComponent implements OnInit {
  priorityItems: { id: number; name: string }[] = [];
  todoItemForm: FormGroup;

  constructor(
    private location: Location,
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
    this.location.back();
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
      priority: this.todoItemForm.get("category").value,
      isFinished: false,
      id: 0
    };

    this.todoItemService.add(todoItem).subscribe(response => {
      this.onCancel();
      this.todoItemService.get();
      window.location.reload();
    });
  }

  get form() {
    return this.todoItemForm.controls;
  }
}
