import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  httpClient = inject(HttpClient);
 
  constructor(){}

  // Récupère tous les personnages de Studio Ghibli depuis l'API
  getGhibliPeople(): Observable<any> {
    return this.httpClient.get('https://ghibliapi.vercel.app/people');
  }

  // Récupère un personnage spécifique à partir de son URL complète
  getPersonByUrl(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  // Récupère plusieurs personnages en parallèle à partir d'un tableau d'URLs
  // Utilisé notamment pour afficher les personnages d'un film
  getPeopleFromUrls(urls: string[]): Observable<any[]> {
    if (!urls || urls.length === 0) {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    
    // forkJoin permet de faire plusieurs requêtes en parallèle et d'attendre que toutes soient terminées
    const requests = urls.map(url => this.getPersonByUrl(url));
    return forkJoin(requests);
  }
}
