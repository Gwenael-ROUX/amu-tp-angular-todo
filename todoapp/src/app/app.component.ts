import { Component } from '@angular/core';
import { Tasks } from './types/task.type';
import { HttpClient } from "@angular/common/http";


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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Tasks>('https://gdhfzvgrmzbndzrpavxp.supabase.co/rest/v1/todos', {
      headers: {
        "Content-Type": "application/json",
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTgyMjcwNSwiZXhwIjoxOTU3Mzk4NzA1fQ.OxacvYbjmQvKOqCoJ4spzfjkp5ZLcHXXrl_mNdh_HTc"
      }
    })
    .subscribe((tasks) => this.tasks = tasks)
  }

  addTask(text: string) {
    // Appelons l'API en POST et signalons que nous recevrons
    // en retour un JSON représentant un tableau de tâches
    this.http.post<Tasks>(
      'https://gdhfzvgrmzbndzrpavxp.supabase.co/rest/v1/todos',
      // Passons à l'API un objet à insérer dans la base de données
      // qui ne comporte que le text et le statut (vu que l'id sera
      // assigné automatiquement par la base de données)
      {
        text: text,
        done: false
      },
      // N'oublions pas les entêtes permettant d'informer le
      // serveur sur ce qu'on envoie et ce que l'on souhaite
      // recevoir
      {
        headers: {
          "Content-Type": "application/json",
          apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTgyMjcwNSwiZXhwIjoxOTU3Mzk4NzA1fQ.OxacvYbjmQvKOqCoJ4spzfjkp5ZLcHXXrl_mNdh_HTc",
          Prefer: "return=representation"
        }
      }
    )
    // Lorsque la requête sera terminée et qu'on aura reçu la réponse du serveur
    // nous recevrons un tableau de tasks, dont la première
    // (et la seule) sera celle qu'on vient d'ajouter.
    // Il nous suffira donc de la pousser dans le tableau, et Angular
    // réaffichera le tableau modifié dans l'interface
    .subscribe((tasks) => this.tasks.push(tasks[0]));
  }

  // Lorsque le composant TodoListComponent va emettre l'événement
  // (onToggle), on va l'écouter et appeler cette méthode on passant
  // l'événement (qui est un identifiant numérique d'une tâche)
  toggle(id: number) {
    // On retrouve la tâche qui correspond à l'identifiant
    const task = this.tasks.find(task => task.id === id);

    // Si la tâche existe
    if (task) {
      // On récupère l'inverse de son statut
      const isDone = !task.done;

      // On appelle l'API en PATCH (pour modifier une tâche)
      this.http.patch<Task>(
        'https://gdhfzvgrmzbndzrpavxp.supabase.co/rest/v1/todos?id=eq.' + id,
        // On ne passe que la donnée qui doit changer
        {
          done: isDone
        },
        // Et toujours les entêtes importantes
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTgyMjcwNSwiZXhwIjoxOTU3Mzk4NzA1fQ.OxacvYbjmQvKOqCoJ4spzfjkp5ZLcHXXrl_mNdh_HTc",
            Prefer: "return=representation"
          }
        }
      )
      // Lorsque la réponse revient, il nous suffit simplement
      // de faire évoluer la tâche locale, et Angular actualisera
      // l'interface HTML
      .subscribe(() => task.done = isDone);
    }
  }
}
