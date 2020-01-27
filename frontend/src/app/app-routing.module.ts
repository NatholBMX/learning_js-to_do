import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AddTodoComponent } from "./add-todo/add-todo.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "todos",
    pathMatch: "full"
  },
  {
    path: "todos",
    component: AppComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
