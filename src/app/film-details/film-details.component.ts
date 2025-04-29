import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../films/films.service';
import { Film } from '../films/films.component';
import { PeopleService } from '../people/people.service';
import { PeopleComponent } from '../people/people.component';
import { HttpClient } from '@angular/common/http';

interface Person {
  id: string;
  name: string;
  gender: string;
  age: string;
  eye_color: string;
  hair_color: string;
  films: string[];
  species: string[];
  url: string;
}

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css'],
  standalone: true,
  imports: [PeopleComponent]
})
export class FilmDetailsComponent implements OnInit {
  film: Film | null = null;
  filmCharacters = signal<Person[]>([]);
  loading = signal<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService,
    private peopleService: PeopleService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // S'abonne aux changements de paramètres dans l'URL (notamment l'ID du film)
    this.route.params.subscribe(params => {
      const filmId = params['id'];
      this.loading.set(true);
      
      // Récupère les détails du film à partir de son ID
      this.filmsService.getFilmById(filmId).subscribe(film => {
        this.film = film;
        
        // Si le film a des personnages associés, récupérer leurs détails
        if (film && film.people && film.people.length > 0) {
          // Récupérer les détails de chaque personnage à partir de leurs URLs
          this.peopleService.getPeopleFromUrls(film.people).subscribe(
            characters => {
              this.filmCharacters.set(characters);
              this.loading.set(false);
            },
            error => {
              console.error('Erreur lors de la récupération des personnages:', error);
              this.loading.set(false);
            }
          );
        } else {
          this.loading.set(false);
        }
      });
    });
  }
}
