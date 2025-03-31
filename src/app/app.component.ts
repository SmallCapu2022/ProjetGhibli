import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  apiService = inject(ApiService)
  ngOnInit(): void {
    this.apiService.getGhibliFilms().subscribe((response) => {
      console.log(response);
    });
  }
  title = 'ProjetGhibli';
}
