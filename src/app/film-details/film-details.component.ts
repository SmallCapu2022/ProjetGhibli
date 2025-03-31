import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../films/films.service';
import { Film } from '../films/films.component';

@Component({
  selector: 'app-film-detailsimports:' ,
  imports: [],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css'
})
export class FilmDetailsComponent implements OnInit {
  film: Film | null = null;

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const filmId = params['id'];
      this.filmsService.getFilmById(filmId).subscribe(film => {
        this.film = film;
      });
    });
  }
}
