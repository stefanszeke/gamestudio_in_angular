import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RatingState, ratingStoreFeatureKey } from "./rating.reducer";



export const selectRatingState = createFeatureSelector<RatingState>(ratingStoreFeatureKey);

export const selectTopScores = createSelector(selectRatingState, (state: RatingState) => state.rating);