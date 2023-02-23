import { Component } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {
  size: number = 10;
  mineCount: number = 10;
  board: string[][] = [];

  constructor() {
    this.initBoard();
  }

  initBoard(): void {
    this.generateBoard();
    this.generateMines();
    this.generateClues();
  }

  generateBoard(): void {
    for (let i = 0; i < this.size; i++) {
      this.board.push([]);
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = "0";
      }
    }
  }

  generateMines(): void {
    let mines = 0;
    while (mines < this.mineCount) {
      let x = Math.floor(Math.random() * this.size);
      let y = Math.floor(Math.random() * this.size);
      if (this.board[x][y] !== "💣") {
        this.board[x][y] = "💣";
        mines++;
      }
    }
  }

  generateClues(): void {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] !== "💣") {
          this.board[i][j] = `${this.countAdjacentMines(i, j)}`;
        }
      }
    }
  }

  countAdjacentMines(x: number, y: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      let actRow = x + i;
      if (actRow >= 0 && actRow < this.size) {
        for (let j = -1; j <= 1; j++) {
          let actCol = y + j;
          if (actCol >= 0 && actCol < this.size) {
            if (this.board[actRow][actCol] === "💣") {
              count++;
            }
          }
        }
      }
    }
    return count;
  }

}
