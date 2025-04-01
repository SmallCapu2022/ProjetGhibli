import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  httpClient = inject(HttpClient);
 
  constructor(){}

  getGhibliPeople(): Observable<any> {
    return this.httpClient.get('https://ghibliapi.vercel.app/people');
  }

  // Récupérer un personnage par son URL complète
  getPersonByUrl(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  // Récupérer tous les personnages d'un film à partir d'un tableau d'URLs
  getPeopleFromUrls(urls: string[]): Observable<any[]> {
    if (!urls || urls.length === 0) {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    
    // Utiliser forkJoin pour faire plusieurs requêtes en parallèle
    const requests = urls.map(url => this.getPersonByUrl(url));
    return forkJoin(requests);
  }
}
