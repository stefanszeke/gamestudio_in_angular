import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ScoreState, scoreStoreFeatureKey } from "./score.reducer";


export const selectScoreState = createFeatureSelector<ScoreState>(scoreStoreFeatureKey);

export const selectTopScores = createSelector(selectScoreState, (state: ScoreState) => state.scores);
export const selectIsPostingScore = createSelector(selectScoreState, (state: ScoreState) => state.isPostingScore);
export const selectIsLoadingScores = createSelector(selectScoreState, (state: ScoreState) => state.isLoadingScores);
export const selectScoreGetError = createSelector(selectScoreState, (state: ScoreState) => state.getError);