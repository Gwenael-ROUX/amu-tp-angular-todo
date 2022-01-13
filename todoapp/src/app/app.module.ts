import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskFormComponent } from './task-form.component';
import { TodoListComponent } from './todo-list.component';
import { TodoListPageComponent } from './pages/todo-list-page.component';
import { TodoDetailsPageComponent } from './pages/todo-details-page.component';

import { TasksService } from './api/tasks.service';

const routes: Routes = [
  // La page d'accueil affichera la liste des tâches
  { path: '', component: TodoListPageComponent },
  // Ici on utilise une URL paramétrée
  { path: ':id/details', component: TodoDetailsPageComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TaskFormComponent,
    TodoListPageComponent,
    TodoDetailsPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
