import { act } from "@ngrx/effects";
import { createReducer, on } from "@ngrx/store";
import { Score } from "src/app/model/Score";
import { ScoreActions } from "./score.actions";

export const scoreStoreFeatureKey = 'score';

export interface ScoreState {
    scores: Score[];
    isLoadingScores: boolean;
    error: any | null;
}

export const initialState: ScoreState = {
    scores: [],
    isLoadingScores: false,
    error: null
}

export const scoreReducer = createReducer (
    initialState,
    on(ScoreActions.loadTopScoresByGame, (state) => ({
        ...state,
        isLoadingScores: true,
        error: null
    })),
    on(ScoreActions.loadTopScoresByGameSuccess, (state, action) => ({
        ...state,
        scores: action.scores,
        isLoadingScores: false,
        error: null
    })),
    on(ScoreActions.loadTopScoresByGameFailure, (state, {error}) => ({
        ...state,
        isLoadingScores: false,
        error: error
    })),
        
)
