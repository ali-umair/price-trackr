import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  imports: [ RouterLink ],
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
