import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  httpClient = inject(HttpClient);
 
  constructor(){}

  getGhibliFilms(): Observable<any> {
    return this.httpClient.get('https://ghibliapi.vercel.app/people')
  }
}
