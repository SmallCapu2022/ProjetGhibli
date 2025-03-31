import { Component, inject } from '@angular/core';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { signal, effect } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private filmsService = inject(FilmsService);
  private peopleService = inject(PeopleService);

  films = signal<any[]>([]);  // Signal pour stocker les films
  people = signal<any[]>([]); // Signal pour stocker les personnages

  // Charger les films et les personnages au démarrage
  constructor() {
    effect(() => {
      this.filmsService.getGhibliFilms().subscribe((films) => {
        this.films.set(films);
      });
      this.peopleService.getGhibliPeople().subscribe((people) => {
        this.people.set(people);
      });
    });
  }

  // Trouver les personnages d'un film particulier
  getPeopleByFilm(films: string): any[] {
    return this.people().filter((people) =>
      people.films.includes(films)
    );
  }

  // Créer les options de quiz pour chaque film
  getQuizOptions(films: string): any[] {
    const peopleInFilm = this.getPeopleByFilm(films);
    const randomPerson = peopleInFilm[Math.floor(Math.random() * peopleInFilm.length)];

    // Créer un tableau d'options (1 bonne et 3 fausses)
    let options = [randomPerson];
    while (options.length < 4) {
      const randomOption = this.people()[Math.floor(Math.random() * this.people().length)];
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }

    // Mélanger les options pour avoir un ordre aléatoire
    return options.sort(() => Math.random() - 0.5);
  }
}
