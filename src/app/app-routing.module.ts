import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TasksComponent} from "./components/tasks/tasks.component";
import {CreateTaskComponent} from "./components/create-task/create-task.component";
import {EditTaskComponent} from "./components/edit-task/edit-task.component";

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: 'task/create', component: CreateTaskComponent },
  { path: 'task/edit/:id', component: EditTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
