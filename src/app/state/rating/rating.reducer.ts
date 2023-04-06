import { createReducer, on } from "@ngrx/store";
import { RatingActions } from "./rating.actions";


export const ratingStoreFeatureKey = 'rating';

export interface RatingState {
  rating: number;
  isGettingRating: boolean;
  getError: any | null;
  isPostingRating: boolean;
  postError: any | null;
}

export const initialState: RatingState = {
  rating: 0,
  isGettingRating: false,
  getError: null,
  isPostingRating: false,
  postError: null
}

export const ratingReducer = createReducer (
  initialState,
  on(RatingActions.loadRating, (state) => ({
    ...state,
    rating: 0,
    isGettingRating: true,
    getError: null
  })),
  on(RatingActions.loadRatingSuccess, (state, action) => ({
    ...state,
    rating: action.rating,
    isGettingRating: false,
    getError: null
  })),
  on(RatingActions.loadRatingFailure, (state, {error}) => ({
    ...state,
    isGettingRating: false,
    getError: error
  })),
  on(RatingActions.postRating, (state) => ({
    ...state,
    isPostingRating: true,
    postError: null
  })),
  on(RatingActions.postRatingSuccess, (state) => ({
    ...state,
    isPostingRating: false,
    postError: null
  })),
  on(RatingActions.postRatingFailure, (state, {error}) => ({
    ...state,
    isPostingRating: false,
    postError: error
  }))
)