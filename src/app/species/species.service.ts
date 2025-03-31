import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  httpClient = inject(HttpClient);

  constructor(){}

  getGhibliSpecies(): Observable<any> {
    return this.httpClient.get('https://ghibliapi.vercel.app/species')
  }
}
