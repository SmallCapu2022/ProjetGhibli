import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilmsService } from './films/films.service';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  apiService = inject(FilmsService)
  ngOnInit(): void {
    this.apiService.getGhibliFilms().subscribe((response) => {
      console.log(response);
    });
  }
  title = 'ProjetGhibli';
}
