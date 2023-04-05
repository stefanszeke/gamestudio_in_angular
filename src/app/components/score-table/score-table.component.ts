import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Timestamp } from 'rxjs';
import { Score } from 'src/app/model/Score';
import { selectIsPostingScore, selectScoreGetError, selectTopScores } from 'src/app/state/score/score.selectors';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss']
})
export class ScoreTableComponent {
  topScores$: Observable<Score[]> = this.store.select(selectTopScores);
  isPostingScore$: Observable<boolean> = this.store.select(selectIsPostingScore);
  getError$: Observable<any> = this.store.select(selectScoreGetError);
  
  constructor(private store: Store) { }

  formatDate(timestamp: any): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-gb') + ' ' + date.toLocaleTimeString('en-gb');
  }
}
