import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FieldComponent } from './games/minesweeper/field/field.component';
import { TileComponent } from './games/minesweeper/tile/tile.component';
import { TimerComponent } from './games/minesweeper/timer/timer.component';

import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { scoreReducer } from './state/score/score.reducer';
import { ScoreEffects } from './state/score/score.effects';

import { ReactiveFormsModule } from '@angular/forms'

import { ScoreTableComponent } from './components/score-table/score-table.component';
import { NavComponent } from './components/nav/nav.component';
import { TictactoeComponent } from './tictactoe/tictactoe/tictactoe.component';
import { BlocksFieldComponent } from './games/blocks/blocks-field/blocks-field.component';
import { BlocksTileComponent } from './games/blocks/blocks-tile/blocks-tile.component';
import { Game1024Component } from './games/game1024/game1024.component';
import { Tile1024Component } from './games/game1024/tile1024/tile1024.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { commentReducer } from './state/comment/comment.reducer';
import { CommentsTableComponent } from './components/comments-table/comments-table.component';
import { CommentEffects } from './state/comment/comment.effects';
import { ratingReducer } from './state/rating/rating.reducer';
import { RatingEffects } from './state/rating/rating.effects';
import { gameReducer } from './state/game/game.reducer';


@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    TileComponent,
    TimerComponent,
    ScoreTableComponent,
    NavComponent,
    TictactoeComponent,
    BlocksFieldComponent,
    BlocksTileComponent,
    Game1024Component,
    Tile1024Component,
    CommentsTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    StoreModule.forRoot({score: scoreReducer, comment: commentReducer, rating: ratingReducer, game: gameReducer}, {}),
    EffectsModule.forRoot([ScoreEffects, CommentEffects, RatingEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
