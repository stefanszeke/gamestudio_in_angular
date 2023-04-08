import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Rating } from 'src/app/model/Rating';
import { selectRating, selectRatingGetError, selectRatingPosted, selectRatingPosting } from 'src/app/state/rating/rating.selectors';
import { faStar, faHourglass } from '@fortawesome/free-solid-svg-icons';
import { RatingActions } from 'src/app/state/rating/rating.actions';
import { selectCurrentGame } from 'src/app/state/game/game.reducer';

@Component({
  selector: 'app-rating-table',
  templateUrl: './rating-table.component.html',
  styleUrls: ['./rating-table.component.scss']
})
export class RatingTableComponent {
  rating$: Observable<number> = this.store.select(selectRating);
  getError$: Observable<any> = this.store.select(selectRatingGetError);
  isRatingPosting$: Observable<boolean> = this.store.select(selectRatingPosting);
  ratingPosted$: Observable<boolean> = this.store.select(selectRatingPosted);

  currentGame$: Observable<string> = this.store.select(selectCurrentGame);

  ratingForm: FormGroup;

  faStar = faStar; faHourglass = faHourglass;

  updatingRating: boolean = false;

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.ratingForm = this.formBuilder.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  onSubmit(): void {
    this.currentGame$.subscribe(game => {
      console.log(game)
      const newRating: Rating =  { player: "test", rating: this.ratingForm.value.rating, game };
      this.store.dispatch(RatingActions.postRating({rating: newRating}));

      this.ratingForm.reset();
    }).unsubscribe();
  }
}
