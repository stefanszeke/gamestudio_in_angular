import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ScoreState, scoreStoreFeatureKey } from "./score.reducer";


export const selectScoreState = createFeatureSelector<ScoreState>(scoreStoreFeatureKey);

export const selectTopScores = createSelector(selectScoreState, (state: ScoreState) => state.scores);