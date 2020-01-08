import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { TaskPriority } from "../todo-item/todo-item.service";
import { NgForm } from "@angular/forms";

import { TodoElement, TodoItemService } from "../todo-item/todo-item.service";

@Component({
  selector: "app-add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.css"]
})
export class AddTodoComponent implements OnInit {
  priorityItems: { id: number; name: string }[] = [];
  constructor(
    private location: Location,
    private todoItemService: TodoItemService
  ) {
    this.transformTaskPriority();
  }

  ngOnInit() {}

  onCancel() {
    this.location.back();
  }

  onSubmit(form: NgForm) {
    const formValues = Object.assign({}, form.value);

    const todoItem: TodoElement = {
      category: `${formValues.category}`,
      name: `${formValues.name}`,
      description: `${formValues.description}`,
      assignee: `${formValues.assignee}`,
      priority: TaskPriority[`${formValues.priority}`],
      isFinished: false,
      id: 0
    };

    this.todoItemService.add(todoItem).subscribe(response => {
      form.reset();
      this.todoItemService.get();
      this.onCancel();
      window.location.reload();
    });
  }

  private transformTaskPriority() {
    for (const n in TaskPriority) {
      if (typeof TaskPriority[n] === "number") {
        this.priorityItems.push({ id: <any>TaskPriority[n], name: n });
      }
    }
  }
}
