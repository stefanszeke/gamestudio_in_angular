import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";

export const gameStoreFeatureKey = 'game';

// state
export interface GameState {
  currentGame: string;
}

export const initialState: GameState = {
  currentGame: ''
}

// actions
export const setCurrentGame = createAction('[Game] Set Current Game', props<{ game: string }>());

// reducers
export const gameReducer = createReducer(
  initialState,
  on(setCurrentGame, (state, { game }) => ({ ...state, currentGame: game }))
);

// selectors

export const selectGameState = createFeatureSelector<GameState>(gameStoreFeatureKey);
export const selectCurrentGame = createSelector(selectGameState, (state: GameState) => state.currentGame);