import { Component, inject, signal } from '@angular/core';
import { FilmsService } from '../films/films.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-findthefilm',
  standalone: true,
  templateUrl: './findthefilm.component.html',
  styleUrls: ['./findthefilm.component.css'],
  imports: []
})
export class FindTheFilmComponent {
  private filmsService = inject(FilmsService);

  totalQuestions = 10;
  currentQuestionIndex = signal(0);
  questions = signal<any[]>([]);
  selectedAnswer = signal<string | null>(null);
  score = signal(0);
  isLoading = signal(true);
  isFinished = signal(false);

  constructor() {
    this.loadQuestions();
  }

  // Charge les questions du quiz en créant un jeu de données aléatoire
  async loadQuestions() {
    this.isLoading.set(true);
    // Récupération de tous les films depuis l'API
    const films = await firstValueFrom(this.filmsService.getGhibliFilms());
    const questions = [];
    const usedIndices = new Set<number>();

    // Génération de questions aléatoires sans doublons
    while (questions.length < this.totalQuestions) {
      const index = Math.floor(Math.random() * films.length);
      if (usedIndices.has(index)) continue;
      usedIndices.add(index);

      // Pour chaque question, on prend un film comme bonne réponse
      const correct = films[index];
      const options = [correct];

      // On ajoute 3 autres films comme mauvaises réponses
      while (options.length < 4) {
        const candidate = films[Math.floor(Math.random() * films.length)];
        if (!options.find(o => o.id === candidate.id)) {
          options.push(candidate);
        }
      }

      // On mélange les options pour que la bonne réponse ne soit pas toujours au même endroit
      questions.push({
        description: correct.description,
        correct,
        options: options.sort(() => Math.random() - 0.5),
      });
    }

    this.questions.set(questions);
    this.isLoading.set(false);
  }

  // Getter pour obtenir la question courante
  get currentQuestion() {
    return this.questions().length > 0
      ? this.questions()[this.currentQuestionIndex()]
      : { description: '', correct: {}, options: [] };
  }

  // Enregistre la réponse sélectionnée par l'utilisateur
  selectAnswer(id: string) {
    this.selectedAnswer.set(id);
  }

  // Passe à la question suivante et vérifie si la réponse était correcte
  next() {
    // Incrémente le score si la réponse est correcte
    if (this.selectedAnswer() === this.currentQuestion.correct.id) {
      this.score.set(this.score() + 1);
    }

    // Termine le jeu si c'était la dernière question, sinon passe à la suivante
    if (this.currentQuestionIndex() + 1 >= this.totalQuestions) {
      this.isFinished.set(true);
    } else {
      this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);
      this.selectedAnswer.set(null);
    }
  }

  // Redémarre le jeu en réinitialisant toutes les valeurs
  restartGame() {
    this.score.set(0);
    this.currentQuestionIndex.set(0);
    this.selectedAnswer.set(null);
    this.isFinished.set(false);
    this.loadQuestions();
  }

  // Crée un tableau pour afficher le nombre d'étoiles correspondant au score
  getStarsArray(n: number): number[] {
    return Array.from({ length: n });
  }
}
