import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() value: string = '0';
  class: string = 'tile';

  setValue(value: string): void {
    this.value = value;
  }

  getStyle(): string {
    switch (this.value) {
      case '0' : return 'tile';
      case '1' : return 'tile tile-1';
      case '2' : return 'tile tile-2';
      case '3' : return 'tile tile-3';
      case '4' : return 'tile tile-4';
      case '5' : return 'tile tile-5';
      case '6' : return 'tile tile-6';
      case '7' : return 'tile tile-7';
      case '8' : return 'tile tile-8';
      case '💣' : return 'tile tile-mine';
      default: return 'tile';
    }
  }
}

