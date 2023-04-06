import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CommentState, commentStoreFeatureKey } from "./comment.reducer";


export const selectScoreState = createFeatureSelector<CommentState>(commentStoreFeatureKey);

export const selectComments = createSelector(selectScoreState, (state: CommentState) => state.comments);
export const selectCommentsGetError = createSelector(selectScoreState, (state: CommentState) => state.getError);