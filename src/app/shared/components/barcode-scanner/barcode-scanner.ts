import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BarcodeScannerComponent implements OnDestroy {
  private scanner: Html5Qrcode | null = null;
  private readonly scannerId = 'scanner';
  isScanning = false;
  scannedText: string | null = null;

  startScanner(): void {
    if (this.isScanning || this.scanner) return;

    this.scanner = new Html5Qrcode(this.scannerId);
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      formatsToSupport: [2, 3, 4, 5, 6, 7, 8, 9]
    };

    this.scanner.start(
      { facingMode: 'environment' },
      config,
      (decodedText: string) => {
        this.scannedText = decodedText;
        alert(`Scanned: ${decodedText}`);
        this.stopScanner(); // auto-stop
      },
      (errorMessage) => {
        // Optional: console.error(errorMessage);
      }
    ).then(() => this.isScanning = true);
  }

  stopScanner(): void {
    if (this.scanner && this.isScanning) {
      this.scanner.stop().then(() => {
        this.isScanning = false;
        this.scanner?.clear();
        this.scanner = null;
      });
    }
  }

  ngOnDestroy(): void {
    this.stopScanner();
  }
}
