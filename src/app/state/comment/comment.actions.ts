import { createAction, props } from "@ngrx/store";
import { Comment } from "src/app/model/Comment";

export const CommentActions = {
  loadComments: createAction('[Comment] Load Comments', props<{game: string}>()),
  loadCommentsSuccess: createAction('[Comment] Load Comments Success', props<{comments: Comment[]}>()),
  loadCommentsFailure: createAction('[Comment] Load Comments Failure', props<{error: any}>()),

  postComment: createAction('[Comment] Post Comment', props<{comment: Comment}>()),
  postCommentSuccess: createAction('[Comment] Post Comment Success', props<{message: any, game:string}>()),
  postCommentFailure: createAction('[Comment] Post Comment Failure', props<{error: any}>()),
}