import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { TodoItemService } from "./todo-item/todo-item.service";

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    TodoListComponent,
    TodoItemComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [TodoItemService],
  bootstrap: [AppComponent]
})
export class AppModule {}
