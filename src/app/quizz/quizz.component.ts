import { Component, inject, signal } from '@angular/core';
import { PeopleService } from '../people/people.service';
import { FilmsService } from '../films/films.service';
import { LocationsService } from '../locations/locations.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-quizz',
  standalone: true,
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
  imports: []
})
export class Quizz {
  // Injection des services pour les différentes catégories
  private peopleService = inject(PeopleService);
  private filmsService = inject(FilmsService);
  private locationsService = inject(LocationsService);

  totalQuestions = 10;
  currentQuestionIndex = signal(0);
  score = signal(0);
  isLoading = signal(true);
  isFinished = signal(false);

  currentQuestion = signal<any | null>(null);
  selectedAnswer = signal<string | null>(null);

  constructor() {
    this.loadNextQuestion();
  }

  // Charge une question aléatoire parmi les catégories disponibles
  async loadNextQuestion() {
    this.isLoading.set(true);
    this.selectedAnswer.set(null);

    // Sélection aléatoire de la catégorie de question (personnes, films ou lieux)
    const categories = ['people', 'films', 'locations'];
    const category = categories[Math.floor(Math.random() * categories.length)];

    let dataset: any[] = [];

    // Récupération des données selon la catégorie sélectionnée
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
      this.isLoading.set(false);
      return;
    }

    // Sélection d'un élément comme réponse correcte
    const correct = dataset[Math.floor(Math.random() * dataset.length)];
    const options = [correct];

    // Ajout de 3 options incorrectes sans duplication
    while (options.length < 4) {
      const candidate = dataset[Math.floor(Math.random() * dataset.length)];
      if (!options.find(o => o.id === candidate.id)) {
        options.push(candidate);
      }
    }

    // Création de la question avec les options mélangées
    this.currentQuestion.set({ 
      category, 
      correct, 
      options: options.sort(() => Math.random() - 0.5) 
    });
    
    this.isLoading.set(false);
  }

  // Génère les indices à afficher selon la catégorie de la question
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

  // Enregistre la réponse sélectionnée
  selectAnswer(id: string) {
    this.selectedAnswer.set(id);
  }

  // Passe à la question suivante et met à jour le score
  next() {
    // Incrémente le score si la réponse est correcte
    if (this.selectedAnswer() === this.currentQuestion().correct.id) {
      this.score.set(this.score() + 1);
    }

    // Termine le quiz ou passe à la question suivante
    if (this.currentQuestionIndex() + 1 >= this.totalQuestions) {
      this.isFinished.set(true);
    } else {
      this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);
      this.loadNextQuestion();
    }
  }

  // Redémarre le quiz avec de nouvelles questions
  restartQuiz() {
    this.score.set(0);
    this.currentQuestionIndex.set(0);
    this.isFinished.set(false);
    this.loadNextQuestion();
  }

  // Génère un tableau d'étoiles pour afficher le score
  getStarsArray(n: number): number[] {
    return Array.from({ length: n });
  }
}
