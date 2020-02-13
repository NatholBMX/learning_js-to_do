import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TaskPriority } from "../services/todo-item.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { TodoElement, TodoItemService } from "../services/todo-item.service";

@Component({
  selector: "app-add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.css"]
})
export class AddTodoComponent implements OnInit {
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  priorityItems: { id: number; name: string }[] = [];
  todoItemForm: FormGroup;
  categoryItems = ["Personal", "Professional", "Finance"];
  isUpdate: boolean;
  submitButtonText: string;
  todo: TodoElement;
  formValues: TodoElement;

  constructor(
    private todoItemService: TodoItemService,
    private formBuilder: FormBuilder
  ) {
    this.transformTaskPriority();
  }

  ngOnInit() {
    this.getTodoItemFromService();
    this.isUpdate = !!this.todo;
    this.submitButtonText = this.isUpdate ? "Update task" : "Add new task";
    this.formValues = this.setFormValues();
    this.buildForm();
  }

  onCancel() {
    this.cancelEvent.emit(false);
    this.todoItemForm.reset();
  }

  private getTodoItemFromService() {
    this.todo = this.todoItemService.getTodoItem();
  }

  private transformTaskPriority() {
    for (const n in TaskPriority) {
      if (typeof TaskPriority[n] === "number") {
        this.priorityItems.push({ id: TaskPriority[n] as any, name: n });
      }
    }
  }

  private setFormValues() {
    if (!this.isUpdate) {
      return {
        category: null,
        name: null,
        description: null,
        assignee: null,
        priority: null,
        isFinished: null,
        id: null
      };
    } else {
      return this.todo;
    }
  }

  private buildForm() {
    this.todoItemForm = this.formBuilder.group({
      category: this.formBuilder.control(this.formValues.category, [
        Validators.required
      ]),
      name: this.formBuilder.control(this.formValues.name, [
        Validators.required
      ]),
      description: this.formBuilder.control(this.formValues.description, [
        Validators.required
      ]),
      assignee: this.formBuilder.control(this.formValues.assignee, [
        Validators.required
      ]),
      priority: this.formBuilder.control(this.formValues.priority, [
        Validators.required
      ])
    });
  }

  onSubmit() {
    const todoItemId = this.isUpdate ? this.todo.id : 0;
    const todoItem: TodoElement = {
      category: this.todoItemForm.get("category").value,
      name: this.todoItemForm.get("name").value,
      description: this.todoItemForm.get("description").value,
      assignee: this.todoItemForm.get("assignee").value,
      priority: this.todoItemForm.get("priority").value,
      isFinished: false,
      id: todoItemId
    };

    if (!this.isUpdate) {
      this.todoItemService.add(todoItem).subscribe(response => {
        this.onCancel();
      });
      console.log("Submitted successfully.");
    } else {
      this.todoItemService.update(todoItem).subscribe(respone => {
        this.onCancel();
      });
      console.log("Updated successfully.");
    }
  }

  get form() {
    return this.todoItemForm.controls;
  }
}
