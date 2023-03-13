import { Component } from '@angular/core';
import { faSquareCaretDown } from '@fortawesome/free-regular-svg-icons';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  menuHidden: boolean = true;

  faSquareCaretDown = faSquareCaretDown; faSquareXmark = faSquareXmark;

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  closeMenu() {
    this.menuHidden = true;
  }


}
