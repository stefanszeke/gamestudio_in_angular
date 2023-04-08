import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RatingState, ratingStoreFeatureKey } from "./rating.reducer";



export const selectRatingState = createFeatureSelector<RatingState>(ratingStoreFeatureKey);

export const selectRating = createSelector(selectRatingState, (state: RatingState) => state.rating);
export const selectRatingGetError = createSelector(selectRatingState, (state: RatingState) => state.getError);
export const selectRatingPosting = createSelector(selectRatingState, (state: RatingState) => state.isPostingRating);
export const selectRatingPosted = createSelector(selectRatingState, (state: RatingState) => state.ratingPosted);