import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, exhaustMap, map, mergeMap, of, concatMap, tap, switchMap } from "rxjs";
import { Score } from "src/app/model/Score";
import { ApiService } from "src/app/services/api.service";
import { ScoreActions } from "./score.actions";



@Injectable()
export class ScoreEffects {

  constructor(private actions$: Actions, private apiService: ApiService) { }

  getTopScoresByName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScoreActions.loadTopScoresByGame), // listen for this action
      // delay(1000), // for testing
      exhaustMap(({ game }) => // exhaustMap waits for the previous observable to complete before calling the next one, game is the payload
        this.apiService.getTopScoresByGame(game).pipe( // call the api service, passing in the game name

          map((response: any) => {
            console.log('getTopScoresByName$ response:', response);
            if(response.message) {
              return ScoreActions.loadTopScoresByGameFailure({ error: response });
            } else {
              return ScoreActions.loadTopScoresByGameSuccess({ scores: response });
            }
          }), // if successful, dispatch this action
          
          catchError((error: any) => {
            console.log('getTopScoresByName$ error:', error);
            return of(ScoreActions.loadTopScoresByGameFailure({ error }))
          }
          ) // if error, dispatch this action
        )
      )
    )
  );

  postScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScoreActions.postScore),
      // delay(1000), // for testing
      mergeMap(({ score }) =>
        this.apiService.postScore(score).pipe(
          delay(1000), // for testing
          map((response: any) => ScoreActions.postScoreSuccess({ message: response.message, game: score.game })),
          catchError((error: any) => of(ScoreActions.postScoreFailure({ error })))
        )
      )
    )
  );

  loadTopScoresByGameAfterPostScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScoreActions.postScoreSuccess),
      concatMap(({ message, game }) =>
        of(ScoreActions.loadTopScoresByGame({ game }))
      )
    )
  );

  // postScoreAndGetScore$ = createEffect(() =>
  //   this.actions$.pipe(
  //     // tap((action) => console.log('postScoreAndGetScore action:', action)),
  //     ofType(ScoreActions.postScoreAndGetScore),
  //     // tap({
  //     //   next: () => console.log('postScore completed'),
  //     //   error: (error) => console.log('postScore error:', error),
  //     //   complete: () => console.log('postScore finished')
  //     // }),
  //     concatMap(({ score }) =>
  //       this.apiService.postScore(score).pipe(
  //         delay(1000),
  //         map((response: any) => {
  //           console.log('response:', response);
  //           ScoreActions.postScoreSuccess({ message: response.message })
  //         }),
  //         concatMap(() => {
  //           // console.log('Game:', score.game);
  //           return [ScoreActions.loadTopScoresByGame({ game: score.game })];
  //         }),
  //         catchError((error) => of(ScoreActions.postScoreFailure({ error: error.message })))
  //       )
  //     )
  //   )
  // );

}