import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  httpClient = inject(HttpClient);
 
  constructor(){}

  getGhibliFilms(): Observable<any> {
    return this.httpClient.get('https://ghibliapi.vercel.app/films')
  }
}

