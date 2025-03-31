import { Component, effect, inject, signal } from '@angular/core';
import { VehiclesService } from './vehicles.service';

interface Vehicle {
id: string,
name: string,
description: string,
vehicle_class: string,
length: number,
pilot: string[],
films:string[],
url:string;
}

@Component({
  selector: 'app-vehicles',
  imports: [],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  private vehiclesService = inject(VehiclesService);

  vehicle = signal<Vehicle[]>([]);

  constructor() {
    effect(() => {
      this.vehiclesService.getGhibliVehicles().subscribe((data) => {
        this.vehicle.set(data);
      });
    });
  }
  
}
