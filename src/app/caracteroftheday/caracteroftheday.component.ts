import { Component, effect, inject, signal } from '@angular/core';
import { PeopleService } from '../people/people.service';
import { FilmsService } from '../films/films.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-caractereoftheday',
  standalone: true,
  templateUrl: './caracteroftheday.component.html',
  styleUrls: ['./caracteroftheday.component.css'],
  imports: []
})
export class CharacterOfTheDayComponent {
  private peopleService = inject(PeopleService);
  private filmsService = inject(FilmsService);

  character = signal<any | null>(null);
  filmTitle = signal<string>('');

  constructor() {
    this.loadCharacterOfTheDay();
  }

  async loadCharacterOfTheDay() {
    const people = await firstValueFrom(this.peopleService.getGhibliPeople());
    const films = await firstValueFrom(this.filmsService.getGhibliFilms());

    // Crée un index basé sur la date pour un personnage du jour stable
    const dayIndex = new Date().getDate() % people.length;
    const selected = people[dayIndex];
    this.character.set(selected);

    const filmUrl = selected.films?.[0];
    const film = films.find((f: { url: any; }) => f.url === filmUrl);
    if (film) this.filmTitle.set(film.title);
  }
}
