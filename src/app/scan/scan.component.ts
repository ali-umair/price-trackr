import { Component } from '@angular/core';
import { BarcodeScannerComponent } from "../shared/components/barcode-scanner/barcode-scanner";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-scan',
  imports: [ BarcodeScannerComponent, NgIf ],
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent {
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
