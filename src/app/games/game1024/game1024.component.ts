import { Component, HostListener } from '@angular/core';
import { GameStatus } from './GameStatus';
import { Tile1024 } from './tile1024/Tile';

@Component({
  selector: 'app-game1024',
  templateUrl: './game1024.component.html',
  styleUrls: ['./game1024.component.scss']
})
export class Game1024Component {

  gameField: Tile1024[][] = [];
  size: number = 4;
  movedOrMerged: boolean = false;
  gameStatus: GameStatus = "playing";
  moveCount: number = 0;

  isUpPressed: boolean = false;
  isLeftPressed: boolean = false;
  isRightPressed: boolean = false;
  isDownPressed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.generateBoard();

    this.addRandomNumber();
    this.addRandomNumber();
  }

  generateBoard(): void {
    for (let i = 0; i < this.size; i++) {
      this.gameField.push([]);
      for (let j = 0; j < this.size; j++) {
        this.gameField[i].push({ value: 0, hidden: true });
      }
    }
  }

  setHidden(i: number,j: number):boolean {
    if(this.gameField[i][j].value === 0) {
      return true;
    }
    return false;
  }

  addRandomNumber():void {
    let validTile: boolean = false;

    let numberToAdd: number = Math.floor(Math.random()*11) > 8 ? 2 : 1

    while(!validTile) {
      let randomRow: number = Math.floor(Math.random()*this.size)
      let randomCol: number = Math.floor(Math.random()*this.size)
  
      if(this.gameField[randomRow][randomCol].value === 0) {
        this.gameField[randomRow][randomCol].value = numberToAdd
        validTile = true;
      }
    }



  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    switch(event.key) {
      case 'w': this.pressKey("up"); break;
      case 's': this.pressKey("down"); break;
      case 'a': this.pressKey("left"); break;
      case 'd': this.pressKey("right"); break;
    }

    if(this.gameStatus !== "playing") return;

    this.movedOrMerged = false;
    switch (event.key) {
      case 'w': this.moveUp(); break;
      case 's': this.moveDown(); break;
      case 'a': this.moveLeft(); break;
      case 'd': this.moveRight(); break;
    }

    if(this.movedOrMerged) {
      this.addRandomNumber();
      this.moveCount++;
    }

    if(this.isWon()) {
      this.gameStatus = "won";
      return;
    }

    if(this.isLost()) {
      this.gameStatus = "lost";
      return;
    }
  }

    
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent3(event: KeyboardEvent) {
    switch(event.key) {
      case 'w': this.releaseKey("up"); break;
      case 's': this.releaseKey("down"); break;
      case 'a': this.releaseKey("left"); break;
      case 'd': this.releaseKey("right"); break;
    }
  }

  
  // RIGHT //////////////////////////////////////////d
  moveRight(): void {
    console.log('moveRight');
    let move: boolean = this.canMoveRight()
    while(move) {
      this.switchRight()
      this.movedOrMerged = true;
      move = this.canMoveRight();
    }
    this.mergeRight();
  }
  switchRight() {
    for (let i = 0; i < this.size; i++) {
      for (let j = this.size-2; j >= 0; j--) {

        if(this.gameField[i][j].value > 0 && this.gameField[i][j+1].value === 0) {
          this.gameField[i][j+1].value = this.gameField[i][j].value;
          this.gameField[i][j].value = 0;
        }
      }
    }
  }
  canMoveRight(): boolean {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size-1; j++) {
        if(this.gameField[i][j].value > 0 && this.gameField[i][j+1].value === 0) {
          return true;
        }
      }
    }
    return false;
  }
  mergeRight(): void {
    for (let i = 0; i < this.size; i++) {
      for (let j = this.size-1; j > 0; j--) {
        if(this.gameField[i][j].value > 0 && (this.gameField[i][j].value === this.gameField[i][j-1].value)) {
          this.gameField[i][j].value *= 2;
          this.gameField[i][j-1].value = 0;
          this.movedOrMerged = true;
        }
      }
    }
    this.switchRight();
  }
  // LEFT //////////////////////////////////////////
  moveLeft(): void {
    console.log('moveLeft');
    let move: boolean = this.canMoveLeft()
    while(move) {
      this.switchLeft()
      this.movedOrMerged = true;
      move = this.canMoveLeft();
    }
    this.mergeLeft();
  }
  switchLeft() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size-1; j++) {

        if(this.gameField[i][j+1].value > 0 && this.gameField[i][j].value === 0) {
          this.gameField[i][j].value = this.gameField[i][j+1].value;
          this.gameField[i][j+1].value = 0;
        }
      }
    }
  }
  canMoveLeft(): boolean {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size-1; j++) {
        if(this.gameField[i][j+1].value > 0 && this.gameField[i][j].value === 0) {
          return true;
        }
      }
    }
    return false;
  }
  mergeLeft(): void {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size-1; j++) {
        if(this.gameField[i][j].value > 0 && (this.gameField[i][j].value === this.gameField[i][j+1].value)) {
          this.gameField[i][j].value *= 2;
          this.gameField[i][j+1].value = 0;
          this.movedOrMerged = true;
        }
      }
    }
    this.switchLeft();
  }
  // Up //////////////////////////////////////////
  moveUp(): void {
    console.log('moveUp');
    let move: boolean = this.canMoveUp()
    while(move) {
      this.switchUp()
      this.movedOrMerged = true;
      move = this.canMoveUp();
    }
    this.mergeUp();
  }
  switchUp() {
    for (let i = 0; i < this.size-1; i++) {
      for (let j = 0; j < this.size; j++) {
        if(this.gameField[i+1][j].value > 0 && this.gameField[i][j].value === 0) {
          this.gameField[i][j].value = this.gameField[i+1][j].value;
          this.gameField[i+1][j].value = 0;
        }
      }
    }
  }
  canMoveUp(): boolean {
    for (let i = 0; i < this.size-1; i++) {
      for (let j = 0; j < this.size; j++) {
        if(this.gameField[i+1][j].value > 0 && this.gameField[i][j].value === 0) {
          return true;
        }
      }
    }
    return false;
  }
  mergeUp(): void {
    for (let i = 0; i < this.size-1; i++) {
      for (let j = 0; j < this.size; j++) {
        if(this.gameField[i][j].value > 0 && (this.gameField[i][j].value === this.gameField[i+1][j].value)) {
          this.gameField[i][j].value *= 2;
          this.gameField[i+1][j].value = 0;
          this.movedOrMerged = true;
        }
      }
    }
    this.switchUp();
  }
  // Down //////////////////////////////////////////
  moveDown(): void {
    console.log('moveDown');
    let move: boolean = this.canMoveDown()
    while(move) {
      this.switchDown()
      this.movedOrMerged = true;
      move = this.canMoveDown();
    }
    this.mergeDown();
  }
  switchDown() {
    for (let i = this.size-1; i > 0; i--) {
      for (let j = 0; j < this.size; j++) {

        if(this.gameField[i-1][j].value > 0 && this.gameField[i][j].value === 0) {
          this.gameField[i][j].value = this.gameField[i-1][j].value;
          this.gameField[i-1][j].value = 0;
        }
      }
    }
  }
  canMoveDown(): boolean {
    for (let i = 0; i < this.size-1; i++) {
      for (let j = 0; j < this.size; j++) {
        if(this.gameField[i][j].value > 0 && this.gameField[i+1][j].value === 0) {
          return true;
        }
      }
    }
    return false;
  }
  mergeDown(): void {
    for (let i = this.size-1; i > 0; i--) {
      for (let j = 0; j < this.size; j++) {
        if(this.gameField[i][j].value > 0 && (this.gameField[i][j].value === this.gameField[i-1][j].value)) {
          this.gameField[i][j].value *= 2;
          this.gameField[i-1][j].value = 0;
          this.movedOrMerged = true;
        }
      }
    }
    this.switchDown();
  }

  isLost(): boolean {
    for(let i = 0; i < this.size; i++) {
      for(let j = 0; j < this.size; j++) {
        if(this.gameField[i][j].value === 0) {
          return false;
        }
      }
    }
    if(this.canMergeAtRow() || this.canMergeAtColumn()) {
      return false;
    }
    return true;
  }

  isWon(): boolean {
    for(let i = 0; i < this.size; i++) {
      for(let j = 0; j < this.size; j++) {
        if(this.gameField[i][j].value === 1024) {
          return true;
        }
      }
    }
    return false;
  }

  reset(): void {
    this.gameStatus = 'reset';
    setTimeout(() => {this.gameStatus = 'playing';}, 500);
    this.gameField = [];
    this.movedOrMerged = false;
    this.generateBoard();
    this.moveCount = 0;
    this.addRandomNumber();
    this.addRandomNumber();
  }

  canMergeAtRow(): boolean {
    for(let i = 0; i < this.size; i++) {
      for(let j = 0; j < this.size-1; j++) {
        if(this.gameField[i][j].value == this.gameField[i][j+1].value) {
          return true;
        }
      }
    }
    return false;
  }

  canMergeAtColumn(): boolean {
    for(let i = 0; i < this.size-1; i++) {
      for(let j = 0; j < this.size; j++) {
        if(this.gameField[i][j].value == this.gameField[i+1][j].value) {
          return true;
        }
      }
    }
    return false;
  }

  getBiggestNumber(): number {
    let biggestNumber: number = 0;
    for(let i = 0; i < this.size; i++) {
      for(let j = 0; j < this.size; j++) {
        if(this.gameField[i][j].value > biggestNumber) {
          biggestNumber = this.gameField[i][j].value;
        }
      }
    }
    return biggestNumber;
  }


  debug(): void {
    this.gameField[0][0].value = 2;
    this.gameField[0][0].hidden = false;
    this.gameField[0][1].value = 2;
    this.gameField[0][1].hidden = false;
    this.gameField[0][2].value = 2;
    this.gameField[0][2].hidden = false;
    this.gameField[0][3].value = 2;
    this.gameField[0][3].hidden = false;

    this.gameField[1][0].value = 2;
    this.gameField[1][0].hidden = false;
    this.gameField[1][1].value = 1;
    this.gameField[1][1].hidden = false;
    this.gameField[1][2].value = 1;
    this.gameField[1][2].hidden = false;
    this.gameField[1][3].value = 1;
    this.gameField[1][3].hidden = false;
  }

  debugClick(event: MouseEvent, x:number, y:number): void {
    if(event.shiftKey) {
      this.gameField[x][y].value === 0 ? this.gameField[x][y].value = 1 : this.gameField[x][y].value *= 2;
    }
  }

  //
  
  dispatchKeyboardEvent(key: string): void {
    console.log("dispatching event: " + key)
    const event = new KeyboardEvent('keydown', {key});
    const event2 = new KeyboardEvent('keyup', {key});
    document.dispatchEvent(event);
    setTimeout(() => document.dispatchEvent(event2), 100);
  }

  pressKey(key: string): void {
    switch(key) {
      case 'up': this.isUpPressed = true; break;
      case 'down': this.isDownPressed = true; break;
      case 'left': this.isLeftPressed = true; break;
      case 'right': this.isRightPressed = true; break;
   }
  }
  
  releaseKey(key: string): void {
    switch(key) {
      case 'up': this.isUpPressed = false; break;
      case 'down': this.isDownPressed = false; break;
      case 'left': this.isLeftPressed = false; break;
      case 'right': this.isRightPressed = false; break;
    }
  }


}
