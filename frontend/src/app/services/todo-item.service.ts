import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class TodoItemService {
  baseUrl = "http://127.0.0.1:5000/todos";
  todoItem: TodoElement;

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<TodoElement[]>(this.baseUrl + "/all").pipe(
      map(response =>
        response.sort((a, b) => {
          if (a.isFinished === b.isFinished) {
            return TaskPriority[a.priority] > TaskPriority[b.priority] ? 1 : -1;
          }
          return a.isFinished > b.isFinished ? 1 : -1;
        })
      ),
      catchError(this.handleError)
    );
  }

  add(todoItem) {
    return this.http.post(this.baseUrl + "/add", todoItem);
  }

  update(todoItem) {
    return this.http.post(this.baseUrl + "/update", todoItem);
  }

  delete(todoItem) {
    return this.http.post(this.baseUrl + "/delete", todoItem);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError("A data error occurred.");
  }

  setTodoItem(todoItem) {
    this.todoItem = todoItem;
  }

  getTodoItem() {
    return this.todoItem;
  }
}

export enum TaskPriority {
  High = 1,
  Medium = 2,
  Low = 3
}

export interface TodoElement {
  category: string;
  name: string;
  description: string;
  assignee: string;
  priority: TaskPriority;
  isFinished: boolean;
  id: number;
}
