import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  httpClient = inject(HttpClient);

  constructor(){}

  getGhibliVehicles(): Observable<any> {
    return this.httpClient.get('https://ghibliapi.vercel.app/vehicles')
  }
}
