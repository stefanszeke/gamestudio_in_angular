import { act } from "@ngrx/effects";
import { createReducer, on } from "@ngrx/store";
import { Score } from "src/app/model/Score";
import { ScoreActions } from "./score.actions";

export const scoreStoreFeatureKey = 'score';

export interface ScoreState {
    scores: Score[];
    isLoadingScores: boolean;
    getError: any | null;
    postError: any | null;
    isPostingScore: boolean;
}

export const initialState: ScoreState = {
    scores: [],
    isLoadingScores: false,
    getError: null,
    postError: null,
    isPostingScore: false
}

export const scoreReducer = createReducer (
    initialState,
    on(ScoreActions.loadTopScoresByGame, (state) => ({
        ...state,
        scores: [],
        isLoadingScores: true,
        getError: null
    })),
    on(ScoreActions.loadTopScoresByGameSuccess, (state, action) => ({
        ...state,
        scores: action.scores,
        isLoadingScores: false,
        getError: null
    })),
    on(ScoreActions.loadTopScoresByGameFailure, (state, {error}) => ({
        ...state,
        isLoadingScores: false,
        getError: error
    })),
    on(ScoreActions.postScore, (state) => ({
        ...state,
        isPostingScore: true,
        postError: null
    })),
    on(ScoreActions.postScoreSuccess, (state) => {
      console.log('postScoreSuccess before:', state);
      const newState = {
        ...state,
        isPostingScore: false,
        postError: null
      };
      console.log('postScoreSuccess after:', newState);
      return newState;
    }),
    on(ScoreActions.postScoreFailure, (state, {error}) => ({
        ...state,
        isPostingScore: false,
        postError: error
    }))
        
)
