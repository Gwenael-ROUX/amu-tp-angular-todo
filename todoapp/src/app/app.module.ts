import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { TaskFormComponent } from './task-form.component';
import { TodoListComponent } from './todo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    // En important le HttpClientModule, on rend disponible dans notre
    // application un service crucial, une instance de la classe HttpClient
    // On pourra utiliser cet objet dans nos composants pour effectuer
    // des requêtes HTTP :
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
