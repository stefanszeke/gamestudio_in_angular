import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "src/app/services/api.service";
import { CommentActions } from "./comment.actions";
import { catchError, exhaustMap, map, of } from "rxjs";



@Injectable()
export class CommentEffects {

  constructor(private actions$: Actions, private apiService: ApiService) { }

  getTopCommentsByGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.loadComments),
      exhaustMap(({ game }) =>
        this.apiService.getTopCommentsByGame(game).pipe(

          map((response: any) => {
            if (response.message) {
              return CommentActions.loadCommentsFailure({ error: response });
            } else {
              return CommentActions.loadCommentsSuccess({ comments: response });
            }
          }),

          catchError((error: any) => {
            return of(CommentActions.loadCommentsFailure({ error }))
          })

        )
      )

    )
  );

  postComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.postComment),
      exhaustMap(({ comment }) =>
        this.apiService.postComment(comment).pipe(
          map((response: any) => CommentActions.postCommentSuccess({ message: response.message, game: comment.game })),
          catchError((error: any) => of(CommentActions.postCommentFailure({ error })))
        )
      )
    )
  );

  loadCommentsAfterPostComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.postCommentSuccess),
      map(({ message, game }) =>
        CommentActions.loadComments({ game })
      )
    )
  );

}