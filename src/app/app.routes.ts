import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilmsComponent } from './films/films.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { PeopleComponent } from './people/people.component';
import { SpeciesComponent } from './species/species.component';
import { AboutComponent } from './about/about.component';
import { LocationsComponent } from './locations/locations.component';
import { FilmDetailsComponent } from './film-details/film-details.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent },
    { path: 'films', component: FilmsComponent },
    { path: 'people', component: PeopleComponent },
    { path: 'locations', component: LocationsComponent },
    { path: 'species', component: SpeciesComponent },
    { path: 'vehicles', component: VehiclesComponent },
    { path: 'about', component: AboutComponent },
    { path: 'films/:id', component: FilmDetailsComponent }
];
