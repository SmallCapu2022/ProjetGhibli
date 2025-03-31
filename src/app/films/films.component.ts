import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService } from './films.service';
import { FilmDetailsComponent } from '../film-details/film-details.component';


export interface Film {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
  url: string;
}

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  imports: [FilmDetailsComponent],
  standalone: true,
})
export class FilmsComponent implements OnInit {

  films: Film[] = [];
  
  constructor(
private filmsService: FilmsService,
    private router: Router
) { }

  ngOnInit(): void {
    this.filmsService.getGhibliFilms().subscribe(data => {
      this.films = data;
    });
  }

  onFilmClick(film: Film): void {
    this.router.navigate(['/films', film.id]);
  }

}
