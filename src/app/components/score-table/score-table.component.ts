import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Score } from 'src/app/model/Score';
import { selectTopScores } from 'src/app/state/score/score.selectors';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss']
})
export class ScoreTableComponent {
  topScores$: Observable<Score[]> = this.store.select(selectTopScores);
  
  constructor(private store: Store) { }
}
