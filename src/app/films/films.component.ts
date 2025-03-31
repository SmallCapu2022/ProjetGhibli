import { Component, OnInit } from '@angular/core';
import { FilmsService } from './films.service'; // Importez FilmsService

interface Film {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  image: string; // Ajout de la propriété image
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
  imports: [],
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  films: Film[] = [];

  constructor(private filmsService: FilmsService) { } // Injectez FilmsService

  ngOnInit(): void {
    this.filmsService.getGhibliFilms().subscribe(data => { // Utilisez le service pour récupérer les films
      this.films = data;
    });
  }

}
