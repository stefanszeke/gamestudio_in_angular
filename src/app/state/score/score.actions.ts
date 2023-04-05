import { createAction, props } from "@ngrx/store";
import { Score } from "src/app/model/Score"; 

export const ScoreActions = {
    loadTopScoresByGame: createAction('[Score] Load Top Scores By Game', props<{game: string}>()),
    loadTopScoresByGameSuccess: createAction('[Score] Load Top Scores By Game Success', props<{scores: Score[]}>()),
    loadTopScoresByGameFailure: createAction('[Score] Load Top Scores By Game Failure', props<{error: any}>()),

    postScore: createAction('[Score] Post Score', props<{score: Score}>()),
    postScoreSuccess: createAction('[Score] Post Score Success', props<{message: any, game:string}>()),
    postScoreFailure: createAction('[Score] Post Score Failure', props<{error: any}>()),

    postScoreAndGetScore: createAction('[Score] Post Score And Get Score', props<{score: Score}>())
}