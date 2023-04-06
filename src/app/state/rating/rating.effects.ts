import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { RatingActions } from "./rating.actions";




@Injectable()
export class RatingEffects {

  constructor(private actions$: Actions, private apiService: ApiService) { }

  getRatingForGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RatingActions.loadRating),
      exhaustMap(({ game }) =>
        this.apiService.getRatingByGame(game).pipe(
          map((response: any) => {
            if (response.message) {
              return RatingActions.loadRatingFailure({ error: response });
            } else {
              return RatingActions.loadRatingSuccess({ rating: response });
            }
          }),
          catchError((error: any) => {
            return of(RatingActions.loadRatingFailure({ error }))
          })
        )
      )
    )
  );


}