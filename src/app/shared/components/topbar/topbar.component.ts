import { Component, Input } from '@angular/core';
import { Location, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-topbar',
  imports: [ NgIf, RouterLink, RouterLinkActive ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})

export class TopbarComponent {
  @Input() title = '';

  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
