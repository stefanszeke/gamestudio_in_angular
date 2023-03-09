import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-tile1024',
  templateUrl: './tile1024.component.html',
  styleUrls: ['./tile1024.component.scss']
})
export class Tile1024Component {
  @Input() value: number = 0;
  @Input() hidden: boolean = true;
  class: string = 'tile';

  getStyle(): string {
    if(!this.hidden) {
      switch (this.value) {
        case 0 : return 'tile tile-0';
        case 1 : return 'tile tile-1';
        case 2 : return 'tile tile-2';
        case 4 : return 'tile tile-4';
        case 8 : return 'tile tile-8';
        case 16 : return 'tile tile-16';
        case 32 : return 'tile tile-32';
        case 64 : return 'tile tile-64';
        case 128 : return 'tile tile-128';
        case 256 : return 'tile tile-256';
        case 512 : return 'tile tile-512';
        case 1024 : return 'tile tile-1024';
        default: return 'tile';
      }
    } 
    return 'tile';
  }


}
