import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';

import { TodoListComponent } from "../todo-list.component"

// Ecrivons une suite de tests qui permettent de s'assurer que le
// TodoListComponent fonctionne correctement et fait ce que nous
// attendons de lui
describe('TodoListComponent', () => {
  // Dans un test, la classe ComponentFixture nous permet de piloter et
  // d'analyser le composant et son rendu HTML. On peut notamment
  // déclencher des événements (exactement comme si on avait le navigateur
  // dans les mains) mais aussi sélectionner des éléments HTML et les
  // analyser, et enfin on peut agir directement sur l'instance du composant

  // Dans un test, la classe ComponentFixture nous permet de piloter et
    // d'analyser le composant et son rendu HTML. On peut notamment
    // déclencher des événements (exactement comme si on avait le navigateur
    // dans les mains) mais aussi sélectionner des éléments HTML et les
    // analyser, et enfin on peut agir directement sur l'instance du composant
    let fixture: ComponentFixture<TodoListComponent>;

    // On voudra souvent agir directement sur l'instance du composant
    // qu'on stockera dans cette variable
    let component: TodoListComponent;

     // Avant chaque exécution d'un test dans cette suite
     beforeEach(async () => {
      // Nous configurons un "faux" module dont le seul but est d'envelopper
      // notre composant
      await TestBed.configureTestingModule({
          // Bien sur, le *faux* module que nous créons doit au moins
          // connaître le composant que nous souhaitons tester :
          declarations: [TodoListComponent],
          // Par ailleurs, notre composant faisant appel à la
          // directive "routerLink" dans son template HTML, nous
          // devons aussi importer le RouterModule, même sans
          // configurer de Routes particulières, ne serait-ce que
          // pour que Angular ne soit pas étonné de trouver un lien
          // portant un attribut "routerLink" :
          imports: [RouterModule.forRoot([])]
      }).compileComponents();

      // Une fois que le module a été "compilé", on va pouvoir
      // demander la création du composant exactement comme cela
      // se passerait dans le framework Angular :
      fixture = TestBed.createComponent(TodoListComponent);
      // Une fois que la fixture est prête, on peut accéder à l'instance
      // du composant qui a été instancié par le TestBed
      component = fixture.componentInstance;
  });

  // Le composant devrait afficher dans l'interface HTML autant de tâches
    // qu'on lui donne dans sa propriété tasks :
    it('should display print each tasks given in input on the screen', () => {
      // Créons un tableau de tâches tel qu'il serait si on le récupérait
      // depuis l'API :
      let MOCK_TASKS = [
          { id: 1, text: "MOCK_TASK_1", done: false },
          { id: 2, text: "MOCK_TASK_2", done: false },
      ]

      // On donne notre tableau à notre composant exactement comme si on
      // avait écrit <app-todo-list [tasks]="MOCK_TASKS"></app-todo-list>
      component.tasks = MOCK_TASKS;

      // Attention : le fait de faire varier une propriété du composant
      // ne changera pas le HTML généré par ce même composant, car
      // ce changement n'aura lieu qu'une fois qu'Angular aura procédé
      // à une *détection de changement*
      // Pour simuler ce comportement du framework, on demande à la
      // fixture de procéder à la détection de changement
      fixture.detectChanges();

      // A partir de là, les changements ont été constaté et
      // projetés dans le template HTML.

      // On peut donc vérifier grâce la fixture si tel ou tel élément
      // HTML existe.
      // Ici, on souhaite s'assurer que le composant a bien affiché
      // 2 élément <li>, puisque le tableau de tâches qu'on lui a donné
      // contient bien 2 tâches
      expect(fixture.debugElement.queryAll(By.css('ul li')).length).toBe(2);
  });

  // Nous souhaitons tester que lorsqu'une case à cocher sera
    // changée par l'utilisateur, alors le composant émettra
    // bien un événement via son @Output() "onToggle" et que celui-ci
    // propagera bien l'identifiant de la tâche qui a été touchée :
    it('should emit an event with onToggle output when a checkbox changes', () => {
      // On représente un nombre qui vaut 0 par défaut mais qui devra
      // changer lorsque l'Output "onToggle" émettre un événément :
      let expectedEventId = 0;

      // Imaginons encore un tableau de tâches
      let MOCK_TASKS = [
          { id: 1, text: "MOCK_TASK_1", done: false },
          { id: 2, text: "MOCK_TASK_2", done: false },
      ];

      // Et confions le à notre composant afin qu'il le projète dans
      // l'interface
      component.tasks = MOCK_TASKS;

      // Faisons aussi en sorte que lorsque onToggle émettra une valeur
      // nous récupérions cette valeur et nous l'assignions à
      // expectedEventId :
      component.onToggle
          .subscribe((id) => expectedEventId = id);

      // Lançons la détection de changement qui permettra de
      // projeter les données des tâches dans l'interface
      fixture.detectChanges();

      // On récupère la checkbox de la première tâche grâce à son
      // identifiant (qui devrait être décochée pour l'instant)
      const checkbox = fixture.debugElement.query(By.css('#item-1'));

      // Simulons le fait qu'un utilisateur change cette checkbox
      checkbox.triggerEventHandler('change', {});

      // On s'attend à ce que le changement de la checkbox ait
      // déclenché l'événement onToggle de notre composant et
      // donc que notre expectedEventId ait pris la valeur de
      // l'identifiant de la tâche qu'on a touché (coché ou décoché) :
      expect(expectedEventId).toBe(1);
  });
})
