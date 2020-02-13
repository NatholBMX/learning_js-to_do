import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { TodoItemService } from "./services/todo-item.service";
import { AddTodoComponent } from "./add-todo/add-todo.component";
import { LoaderComponent } from "./shared/loader/loader.component";
import { LoaderService } from "./services/loader.service";
import { LoaderInterceptor } from "./shared/interceptors/loader.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    TodoListComponent,
    TodoItemComponent,
    AddTodoComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    TodoItemService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
