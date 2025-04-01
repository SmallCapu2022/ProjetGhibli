import { Component, inject, signal, effect } from '@angular/core';
import { PeopleService } from '../people/people.service';
import { FilmsService } from '../films/films.service';
import { LocationsService } from '../locations/locations.service';
import { firstValueFrom } from 'rxjs';
import { CharacterOfTheDayComponent } from "../caracteroftheday/caracteroftheday.component";
import { FindTheFilmComponent } from "../findthefilm/findthefilm.component";
import { Quizz } from "../quizz/quizz.component";


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CharacterOfTheDayComponent, FindTheFilmComponent, Quizz]
})
export class HomeComponent {
  leaves = Array.from({ length: 10 });

}
