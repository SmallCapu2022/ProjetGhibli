import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  httpClient = inject(HttpClient);

  constructor(){}

  // Récupère tous les films depuis l'API Ghibli
  getGhibliFilms(): Observable<any> {
    return this.httpClient.get('https://ghibliapi.vercel.app/films');
  }

  // Récupère un film spécifique par son ID en filtrant tous les films
  getFilmById(id: string): Observable<any> {
    return this.getGhibliFilms().pipe(
      map((films: any[]) => films.find(film => film.id === id))
    );
  }
  
  // Filtre les films en fonction d'un pattern de recherche (utilisé pour la barre de recherche)
  getGhibliFilmsFiltered(pattern: string): Observable<any[]> {
    return this.getGhibliFilms().pipe(
      map((films: any[]) =>
        films.filter(film =>
          film.title.toLowerCase().includes(pattern.toLowerCase())
        )
      )
    );
  }
  
}

