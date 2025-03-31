import { Component, effect, inject, signal } from '@angular/core';
import { PeopleService } from './people.service';
import { RouterLink } from '@angular/router';

interface People {
id: string,
name: string,
gender: string,
age: string,
eye_color: string,
hair_color: string,
films: string[],
species:string[],
url:string;
}

@Component({
  selector: 'app-people',
  imports: [RouterLink],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {
  private peopleService = inject(PeopleService);

  people = signal<People[]>([]);

  constructor() {
    effect(() => {
      this.peopleService.getGhibliPeople().subscribe((data) => {
        this.people.set(data);
      });
    });
  }

  extractId(url: string): string {
    return url.split('/').pop() ?? '';
  }
  
}
