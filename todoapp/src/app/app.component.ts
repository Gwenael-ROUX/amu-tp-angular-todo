import { Component } from '@angular/core';
import { Tasks } from './types/task.type';
import { HttpClient } from "@angular/common/http";
import { TasksService } from './api/tasks.service';



@Component({
  selector: 'app-root',
  template: `
    <div id="app">
        <h1>La Todo App</h1>

        <main>
          <app-todo-list
            [tasks]="tasks"
            (onToggle)="toggle($event)"
          ></app-todo-list>
          <app-task-form
            (onNewTask)="addTask($event)"
          ></app-task-form>
        </main>
    </div>
  `,
  styles: []
})
export class AppComponent {

  tasks: Tasks = [];

  // On ajoute au constructeur une demande de recevoir une instance
  // du TasksService :
  constructor(
    private http: HttpClient,
    private service: TasksService
  ) { }

  ngOnInit() {
    // On remplace le code de la requête HTTP par l'appel
    // à la méthode findAll() de notre service, qui renverra
    // exactement la même chose que ce que renvoyait le
    // HttpClient, on réagira donc de la même manière via la
    // méthode subscribe()
    this.service
      .findAll()
      .subscribe((tasks) => this.tasks = tasks)
  }

  toggle(id: number) {
    const task = this.tasks.find(task => task.id === id);

    if (task) {
      const isDone = !task.done;

      this.service
        .toggleDone(id, isDone)
        .subscribe(() => task.done = isDone);
    }
  }

  addTask(text: string) {
    this.service
      .create(text)
      .subscribe((tasks) => this.tasks.push(tasks[0]));
  }
}
