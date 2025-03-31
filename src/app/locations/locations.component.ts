import { Component, effect, inject, signal } from '@angular/core';
import { LocationsService } from './locations.service';  // Le service pour récupérer les données
import { RouterLink } from '@angular/router';

interface Location {
  id: string;
  name: string;
  climate: string;
  terrain: string;
  surface_water: number;
  residents: string[];
  films: string[];
  url: string;
}

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [],
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent {
  private locationsService = inject(LocationsService);  // Injection du service

  locations = signal<Location[]>([]);  // Signal pour les locations
  selectedLocation = signal<Location | null>(null);  // Signal pour une location sélectionnée

  constructor() {
    // Effect qui récupère les données via le service
    effect(() => {
      this.locationsService.getGhibliLocations().subscribe((data) => {
        this.locations.set(data);
      });
    });
  }
}
