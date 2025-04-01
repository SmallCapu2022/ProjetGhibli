import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FilmsService } from '../films/films.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  filmsService = inject(FilmsService);
  router = inject(Router);

  matchingFilms: any[] = [];
  errorMessage = '';

  onFilter = (pattern: string) => {
    this.filmsService.getGhibliFilmsFiltered(pattern).subscribe(data => {
      this.errorMessage = '';
      this.matchingFilms = [];

      if (data.length === 1) {
        this.router.navigate(['/films', data[0].id]);
      } else if (data.length > 1) {
        this.matchingFilms = data;
      } else {
        this.errorMessage = 'No film found. Please try another title.';
      }
    });
  }

  goToFilm(id: string): void {
    this.router.navigate(['/films', id]);
    this.matchingFilms = []; // Clear list
  }
}
