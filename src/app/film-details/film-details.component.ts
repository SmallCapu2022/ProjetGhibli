import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../films/films.service';
import { Film } from '../films/films.component';
import { PeopleComponent } from '../people/people.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css'],
  standalone: true,
  imports: [PeopleComponent]
})
export class FilmDetailsComponent implements OnInit {
  film: Film | null = null;
  people: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const filmId = params['id'];
      this.filmsService.getFilmById(filmId).subscribe(film => {
        this.film = film;
        if (film && film.people) {
          this.people=film.people;
        }
      });
    });
  }

}
