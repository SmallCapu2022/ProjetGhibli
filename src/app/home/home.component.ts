import { Component, inject, signal, effect } from '@angular/core';
import { PeopleService } from '../people/people.service';
import { FilmsService } from '../films/films.service';
import { LocationsService } from '../locations/locations.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: []
})
export class HomeComponent {
  private peopleService = inject(PeopleService);
  private filmsService = inject(FilmsService);
  private locationsService = inject(LocationsService);

  // Quiz settings
  totalQuestions = 10;
  currentQuestionIndex = signal(0);
  score = signal(0);
  isLoading = signal(true);
  isFinished = signal(false);

  // State
  currentQuestion = signal<any | null>(null);
  selectedAnswer = signal<string | null>(null);

  constructor() {
    this.loadNextQuestion();
  }

  async loadNextQuestion() {
    try {
      this.isLoading.set(true);
      this.selectedAnswer.set(null);
  
      const categories = ['people', 'films', 'locations'];
      const category = categories[Math.floor(Math.random() * categories.length)];
  
      let dataset: any[] = [];
  
      switch (category) {
        case 'people':
          dataset = await firstValueFrom(this.peopleService.getGhibliPeople());

          break;
        case 'films':
          dataset = await firstValueFrom(this.filmsService.getGhibliFilms());
          break;
        case 'locations':
          dataset = await firstValueFrom(this.locationsService.getGhibliLocations());
          break;
      }
  
      if (!dataset || dataset.length === 0) {
        console.error('Données vides pour', category);
        this.isLoading.set(false);
        return;
      }
  
      const correct = dataset[Math.floor(Math.random() * dataset.length)];
      const options = [correct];
  
      while (options.length < 4 && dataset.length > 1) {
        const candidate = dataset[Math.floor(Math.random() * dataset.length)];
        if (!options.find(o => o.id === candidate.id)) {
          options.push(candidate);
        }
      }
  
      options.sort(() => Math.random() - 0.5);
      this.currentQuestion.set({ category, correct, options });
  
    } catch (e) {
      console.error('Erreur dans loadNextQuestion :', e);
    } finally {
      this.isLoading.set(false);
    }
  }
  

  getClues(): string[] {
    const q = this.currentQuestion();
    const c = q.correct;
    switch (q.category) {
      case 'people':
        return [`Gender: ${c.gender}`, `Hair: ${c.hair_color}`, `Eyes: ${c.eye_color}`, `Age: ${c.age}`];
      case 'films':
        return [`Director: ${c.director}`, `Producer: ${c.producer}`, `Release: ${c.release_date}`, `RT Score: ${c.rt_score}`];
      case 'locations':
        return [`Climate: ${c.climate}`, `Terrain: ${c.terrain}`, `Water: ${c.surface_water}`];
      default:
        return [];
    }
  }
  getStarsArray(n: number): number[] {
    return Array.from({ length: n });
  }
  
  selectAnswer(id: string) {
    this.selectedAnswer.set(id);
  }

  next() {
    const selectedId = this.selectedAnswer();
    const correctId = this.currentQuestion().correct.id;

    if (selectedId === correctId) {
      this.score.set(this.score() + 1);
    }

    if (this.currentQuestionIndex() + 1 >= this.totalQuestions) {
      this.isFinished.set(true);
    } else {
      this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);
      this.loadNextQuestion();
    }
  }

  restartQuiz() {
    this.score.set(0);
    this.currentQuestionIndex.set(0);
    this.isFinished.set(false);
    this.loadNextQuestion();
  }
}
