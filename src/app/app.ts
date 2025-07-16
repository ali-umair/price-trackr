import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarcodeScannerComponent } from "./barcode-scanner/barcode-scanner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarcodeScannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('temp-app');
}
