import { Component } from '@angular/core';
import { BarcodeScannerComponent } from "../../shared/components/barcode-scanner/barcode-scanner";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-scan-price',
  imports: [ BarcodeScannerComponent, NgIf ],
  templateUrl: './scan-price.component.html',
  styleUrl: './scan-price.component.css'
})
export class ScanPriceComponent {
  scannedBarcode: string | null = null;

  handleScannedBarcode(barcode: string): void {
    this.scannedBarcode = barcode;
    // You can now:
    // - Save to database
    // - Display it
    // - Open modal, etc.
  }
}
