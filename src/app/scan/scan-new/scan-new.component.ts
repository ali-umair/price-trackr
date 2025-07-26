import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { BarcodeScannerComponent } from "../../shared/components/barcode-scanner/barcode-scanner";

@Component({
  selector: 'app-scan-new',
  imports: [NgIf, BarcodeScannerComponent],
  templateUrl: './scan-new.component.html',
  styleUrls: ['./scan-new.component.css']
})
export class ScanNewComponent {
  isEditMode = false;
  scannedBarcode: string | null = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      this.isEditMode = data['edit'] || false;
    });
  }

  handleScannedBarcode(barcode: string): void {
    this.scannedBarcode = barcode;
    // You can now:
    // - Save to database
    // - Display it
    // - Open modal, etc.
  }
}
