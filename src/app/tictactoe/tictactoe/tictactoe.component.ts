import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ScoreActions } from 'src/app/state/score/score.actions';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.scss']
})
export class TictactoeComponent {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(ScoreActions.loadTopScoresByGame({game: 'Tictactoe'}));
  }

}
