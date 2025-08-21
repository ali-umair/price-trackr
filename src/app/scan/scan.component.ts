import { Component, Inject } from '@angular/core';
import { BarcodeScannerComponent } from "../shared/components/barcode-scanner/barcode-scanner";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../data/product-db';
import { Observable } from 'dexie';
import { Tooltip } from "../shared/components/tooltip/tooltip";

@Component({
  selector: 'app-scan',
  imports: [BarcodeScannerComponent, NgIf, ReactiveFormsModule, Tooltip],
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent {
  isEditMode = false;
  scannedBarcode: string = "";
  test: string = "skljdfksjdflksjdflksjdflksjfdlskjdflksjdfsdf";
  productName = new FormControl('', Validators.required);
  productId = new FormControl(-1, Validators.required);
  productDesc = new FormControl('', [Validators.required, Validators.min(0)]);

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productService: ProductService) {
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

  resetForm(): void {
    this.scannedBarcode = "";
    this.productName.reset();
    this.productDesc.reset();
  }

  async handleScannedBarcode(barcode: string) {
    this.scannedBarcode = barcode;
    const product: Product | undefined = await this.productService.getByBarcode(barcode);;
    if (product && product.id) {
      this.productName.setValue(product.name);
      this.productDesc.setValue(product.price.toString());
      this.productId.setValue(product.id);
      this.isEditMode = true;
    } else {
      this.productName.reset();
      this.productDesc.reset();
      this.isEditMode = false;
    }
  }

  saveProduct(): void {
    if (!this.scannedBarcode || !this.productName.value || !this.productDesc.value) {
      return;
    }
    let product: Product = {
      barcode: this.scannedBarcode,
      name: this.productName.value,
      price: parseInt(this.productDesc.value)
    };

    if (this.isEditMode) {
      if (!this.productId.value || this.productId.value < 0) {
        console.error("Product ID is invalid for update.");
        return;
      }
      const productUpdated = this.productService.update(this.productId.value, product);
      console.log("Product updated:", productUpdated);
    } else {
      const productAdded = this.productService.add(product);
      console.log("Product added:", productAdded);
      this.resetForm();
      alert("Product saved successfully!");
      this.router.navigate(['/scan']);
    }
  }
}
