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

  async loadQuestions() {
    this.isLoading.set(true);
    const films = await firstValueFrom(this.filmsService.getGhibliFilms());
    const questions = [];
    const usedIndices = new Set<number>();

    while (questions.length < this.totalQuestions) {
      const index = Math.floor(Math.random() * films.length);
      if (usedIndices.has(index)) continue;
      usedIndices.add(index);

      const correct = films[index];
      const options = [correct];

      while (options.length < 4) {
        const candidate = films[Math.floor(Math.random() * films.length)];
        if (!options.find(o => o.id === candidate.id)) {
          options.push(candidate);
        }
      }

      questions.push({
        description: correct.description,
        correct,
        options: options.sort(() => Math.random() - 0.5),
      });
    }

    this.questions.set(questions);
    this.isLoading.set(false);
  }

  get currentQuestion() {
    return this.questions().length > 0
      ? this.questions()[this.currentQuestionIndex()]
      : { description: '', correct: {}, options: [] };
  }

  selectAnswer(id: string) {
    this.selectedAnswer.set(id);
  }

  next() {
    if (this.selectedAnswer() === this.currentQuestion.correct.id) {
      this.score.set(this.score() + 1);
    }

    if (this.currentQuestionIndex() + 1 >= this.totalQuestions) {
      this.isFinished.set(true);
    } else {
      this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);
      this.selectedAnswer.set(null);
    }
  }

  restartGame() {
    this.score.set(0);
    this.currentQuestionIndex.set(0);
    this.selectedAnswer.set(null);
    this.isFinished.set(false);
    this.loadQuestions();
  }

  getStarsArray(n: number): number[] {
    return Array.from({ length: n });
  }
}
