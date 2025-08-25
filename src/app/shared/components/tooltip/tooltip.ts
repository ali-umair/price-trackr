import { NgIf } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  imports: [NgIf],
  templateUrl: './tooltip.html'
})
export class Tooltip {
  @Input() text = '';
  @Input() type: 'text' | 'date' = 'text';
  open = false;

  get previewText() {
    if (this.type === 'date') {
      return ''; // no preview text, handled by icon
    }
    const words = this.text.split(' ');
    return words.length > 1 ? `${words[0]}...` : words[0];
  }

  toggle() {
    this.open = !this.open;
  }

  // Optional: close if you tap outside
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('app-tooltip')) {
      this.open = false;
    }
  }
}
