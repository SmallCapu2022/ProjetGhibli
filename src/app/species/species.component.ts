import { Component, effect, inject, signal } from '@angular/core';
import { SpeciesService } from './species.service';
import { RouterLink } from '@angular/router';

interface Specie {
id: string,
name: string,
classification: string,
eye_colors: string,
hair_colors: string,
films: string[],
people:string[],
url:string;
}

@Component({
  selector: 'app-species',
  imports: [],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css'
})
export class SpeciesComponent {
  private speciesService = inject(SpeciesService);

  specie = signal<Specie[]>([]);

  constructor() {
    effect(() => {
      this.speciesService.getGhibliSpecies().subscribe((data) => {
        this.specie.set(data);
      });
    });
  }
  
}
