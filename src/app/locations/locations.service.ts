import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  httpClient = inject(HttpClient);

  constructor() {}

  // Méthode pour récupérer toutes les locations
  getGhibliLocations(): Observable<any> {
    return this.httpClient.get('https://ghibliapi.vercel.app/locations');
  }

}
