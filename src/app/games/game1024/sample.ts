import { Component, HostListener } from '@angular/core';
import { GameStatus } from './GameStatus';
import { faCaretUp, faCaretDown, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { ScoreActions } from 'src/app/state/score/score.actions';
import { CommentActions } from 'src/app/state/comment/comment.actions';
import { setCurrentGame } from 'src/app/state/game/game.reducer';
import { RatingActions } from 'src/app/state/rating/rating.actions';
import { Tile1024 } from './tile1024/tile1024.component';
import { Vector } from './Vector';
import { ITile1024 } from './tile1024/ITile1024';


@Component({
  selector: 'app-game1024',
  templateUrl: './game1024.component.html',
  styleUrls: ['./game1024.component.scss']
})
export class Game1024Component {

  gameField: ITile1024[][] = [];
  size: number = 4;
  movedOrMerged: boolean = false;
  gameStatus: GameStatus = "playing";
  moveCount: number = 0;

  isUpPressed: boolean = false;
  isLeftPressed: boolean = false;
  isRightPressed: boolean = false;
  isDownPressed: boolean = false;

  faCaretUp = faCaretUp; faCaretDown = faCaretDown; faCaretLeft = faCaretLeft; faCaretRight = faCaretRight;




  constructor(private store: Store) { }

  ngOnInit(): void {
    this.generateBoard();

    this.addRandomNumber();
    this.addRandomNumber();

    this.store.dispatch(setCurrentGame({ game: 'Game1024' }));
    this.store.dispatch(RatingActions.loadRating({ game: 'Game1024' }));
    this.store.dispatch(ScoreActions.loadTopScoresByGame({ game: 'Game1024' }));
    this.store.dispatch(CommentActions.loadComments({ game: 'Game1024' }));

    console.log(this.gameField);
  }

  generateBoard(): void {
    // for (let i = 0; i < this.size; i++) {
    //   this.gameField.push([]);
    //   for (let j = 0; j < this.size; j++) {
    //     this.gameField[i].push(new Tile1024Component());
    //   }
    // }
    this.gameField = new Array(this.size).fill(null).map(() => new Array(this.size).fill(null).map(() => new Tile1024));
  }

  setHidden(i: number, j: number): boolean {
    return this.gameField[i][j].value === 0;
  }

  addRandomNumber(): void {
    let validTile: boolean = false;

    let numberToAdd: number = Math.floor(Math.random() * 11) > 8 ? 2 : 1

    while (!validTile) {
      let randomRow: number = Math.floor(Math.random() * this.size)
      let randomCol: number = Math.floor(Math.random() * this.size)

      if (this.gameField[randomRow][randomCol].value === 0) {
        this.gameField[randomRow][randomCol].value = numberToAdd
        validTile = true;
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    const directionMap: { [key: string]: string } = {
      w: "up",
      s: "down",
      a: "left",
      d: "right",
    };

    const direction = directionMap[event.key];
    if (!direction) return;

    this.pressKey(direction);

    if (this.gameStatus !== "playing") return;

    this.movedOrMerged = this.handleMove(direction);

    if (this.movedOrMerged) {
      this.addRandomNumber();
      this.moveCount++;
    }

    if (this.isWon()) {
      this.gameStatus = "won";
      return;
    }

    if (this.isLost()) {
      this.gameStatus = "lost";
      return;
    }
  }



  // handle and iterate from gpt
  handleMove(direction: string): boolean {
    const vectors: { [key: string]: Vector } = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };

    const vector: Vector = vectors[direction];

    if (!vector) return false;

    let moved = false;
    let movedOrMerged;

    do {
      movedOrMerged = false;
      this.iterateTiles((x, y) => {
        if (!this.gameField[y][x].isEmpty()) {
          const newX = x + vector.x;
          const newY = y + vector.y;

          if (this.isInBounds(newX, newY)) {
            if (this.gameField[y][x].mergeWith(this.gameField[newY][newX])) {
              movedOrMerged = true;
            } else if (this.gameField[newY][newX].isEmpty()) {
              this.gameField[newY][newX].value = this.gameField[y][x].value;
              this.gameField[y][x].value = 0;
              movedOrMerged = true;
            }
          }
        }
      }, vector.x, vector.y);

      moved = moved || movedOrMerged;
    } while (movedOrMerged);

    console.log(moved)
    return moved;
  }

  iterateTiles(callback: (x: number, y: number) => void, dx = 0, dy = 0): void {
    const range = Array.from({ length: this.size }, (_, i) => i);

    if (dx > 0 || dy > 0) {
      range.reverse();
    }

    for (const y of range) {
      for (const x of range) {
        callback(x, y);
      }
    }
  }

  isInBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }


  // 
  isLost(): boolean {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.gameField[i][j].value === 0) {
          return false;
        }
      }
    }
    if (this.canMergeAtRow() || this.canMergeAtColumn()) {
      return false;
    }
    return true;
  }

  isWon(): boolean {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.gameField[i][j].value === 1024) {
          return true;
        }
      }
    }
    return false;
  }

  reset(): void {
    this.gameStatus = 'reset';
    setTimeout(() => { this.gameStatus = 'playing'; }, 500);
    this.gameField = [];
    this.movedOrMerged = false;
    this.generateBoard();
    this.moveCount = 0;
    this.addRandomNumber();
    this.addRandomNumber();
  }

  canMergeAtRow(): boolean {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size - 1; j++) {
        if (this.gameField[i][j].value == this.gameField[i][j + 1].value) {
          return true;
        }
      }
    }
    return false;
  }

  canMergeAtColumn(): boolean {
    for (let i = 0; i < this.size - 1; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.gameField[i][j].value == this.gameField[i + 1][j].value) {
          return true;
        }
      }
    }
    return false;
  }

  getBiggestNumber(): number {
    let biggestNumber: number = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.gameField[i][j].value > biggestNumber) {
          biggestNumber = this.gameField[i][j].value;
        }
      }
    }
    return biggestNumber;
  }



  debugClick(event: MouseEvent, x: number, y: number): void {
    if (event.shiftKey) {
      this.gameField[x][y].value === 0 ? this.gameField[x][y].value = 1 : this.gameField[x][y].value *= 2;
    }
  }

  // controls

  dispatchKeyboardEvent(key: string): void {
    const event = new KeyboardEvent('keydown', { key });
    const event2 = new KeyboardEvent('keyup', { key });
    document.dispatchEvent(event);
    setTimeout(() => document.dispatchEvent(event2), 100);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent3(event: KeyboardEvent) {
    switch (event.key) {
      case 'w': this.releaseKey("up"); break;
      case 's': this.releaseKey("down"); break;
      case 'a': this.releaseKey("left"); break;
      case 'd': this.releaseKey("right"); break;
    }
  }

  pressKey(key: string): void {
    switch (key) {
      case 'up': this.isUpPressed = true; break;
      case 'down': this.isDownPressed = true; break;
      case 'left': this.isLeftPressed = true; break;
      case 'right': this.isRightPressed = true; break;
    }
  }

  releaseKey(key: string): void {
    switch (key) {
      case 'up': this.isUpPressed = false; break;
      case 'down': this.isDownPressed = false; break;
      case 'left': this.isLeftPressed = false; break;
      case 'right': this.isRightPressed = false; break;
    }
  }




}
