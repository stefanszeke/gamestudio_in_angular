import { createAction, props } from "@ngrx/store";
import { Rating } from "src/app/model/Rating";


export const RatingActions = {
  loadRating: createAction('[Rating] Load Ratings', props<{ game: string }>()),
  loadRatingSuccess: createAction('[Rating] Load Ratings Success', props<{ rating: number }>()),
  loadRatingFailure: createAction('[Rating] Load Ratings Failure', props<{ error: any }>()),

  postRating: createAction('[Rating] Post Rating', props<{ rating: Rating }>()),
  postRatingSuccess: createAction('[Rating] Post Rating Success', props<{ message: any, game: string }>()),
  postRatingFailure: createAction('[Rating] Post Rating Failure', props<{ error: any }>()),
}