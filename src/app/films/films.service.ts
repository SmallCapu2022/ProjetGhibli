import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  httpClient = inject(HttpClient);

  constructor(){}

  getGhibliFilms(): Observable<any> {
    return this.httpClient.get('https://ghibliapi.vercel.app/films');
  }

  getFilmById(id: string): Observable<any> {
    return this.getGhibliFilms().pipe(
      map((films: any[]) => films.find(film => film.id === id))
    );
  }
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

