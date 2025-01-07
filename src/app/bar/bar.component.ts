import { Component } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent {
  isMenuOpen: boolean = false;

  menu() {
    // Toggle the visibility of the menu
    this.isMenuOpen = !this.isMenuOpen;
  }

}
