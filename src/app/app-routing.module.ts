import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocksFieldComponent } from './games/blocks/blocks-field/blocks-field.component';
import { Game1024Component } from './games/game1024/game1024.component';
import { FieldComponent } from './games/minesweeper/field/field.component';
import { TictactoeComponent } from './tictactoe/tictactoe/tictactoe.component';

const routes: Routes = [
  { path: '', redirectTo: '/game1024', pathMatch: 'full'},
  { path: 'minesweeper', component: FieldComponent },
  { path: 'tictactoe', component: TictactoeComponent },
  { path: 'blocks', component: BlocksFieldComponent },
  { path: 'game1024', component: Game1024Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
