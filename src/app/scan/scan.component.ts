import { Component, Inject } from '@angular/core';
import { BarcodeScannerComponent } from "../shared/components/barcode-scanner/barcode-scanner";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../data/product-db';
import { Tooltip } from "../shared/components/tooltip/tooltip";

@Component({
  selector: 'app-scan',
  imports: [BarcodeScannerComponent, NgIf, ReactiveFormsModule, Tooltip, NgFor ],
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent {
  isEditMode = false;
  scannedBarcode: string = "";
  test: string = "skljdfksjdflksjdflksjdflksjfdlskjdflksjdfsdf";
  productForm: FormGroup;
  showPriceHistoryModal = false;
  newPriceForm: FormGroup;

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

    this.productForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      productId: new FormControl(-1, Validators.required),
      productDesc: new FormControl('', [Validators.required]),
      priceHistory: new FormArray([]),
    });

    this.newPriceForm = new FormGroup({
      rupees: new FormControl('', [Validators.required, Validators.min(1)]),
      shop: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });
  }

  resetForm(): void {
    this.scannedBarcode = "";
    this.productForm.get("productName")?.reset();
    this.productForm.get("productDesc")?.reset();
  }

  get priceHistory() {
    return this.productForm.get('priceHistory') as FormArray;
  }

  openPriceModal() {
    this.showPriceHistoryModal = true;
  }

  closePriceModal() {
    this.showPriceHistoryModal = false;
    this.newPriceForm.reset();
  }

  async handleScannedBarcode(barcode: string) {
    this.scannedBarcode = barcode;
    const product: Product | undefined = await this.productService.getByBarcode(barcode);
    if (product && product.id) {
      this.productForm.get("productName")?.setValue(product.name);
      this.productForm.get("productDesc")?.setValue(product.description);
      this.productForm.get("productId")?.setValue(product.id);
      this.isEditMode = true;
    } else {
      this.productForm.get("productName")?.reset();
      this.productForm.get("productDesc")?.reset();
      this.isEditMode = false;
    }
  }

  addPrice() {
    if (this.newPriceForm.valid) {
      this.priceHistory.push(new FormGroup({
        rupees: new FormControl(this.newPriceForm.value.rupees),
        shop: new FormControl(this.newPriceForm.value.shop),
        date: new FormControl(this.newPriceForm.value.date),
      }));
      this.closePriceModal();
    }
  }

  saveProduct(): void {
    if (!this.scannedBarcode || !this.productForm.get("productName")?.value || !this.productForm.get("productDesc")?.value) {
      return;
    }
    let product: Product = {
      barcode: this.scannedBarcode,
      name: this.productForm.get("productName")?.value || "",
      description: this.productForm.get("productDesc")?.value || ""
    };

    if (this.isEditMode) {
      const productId = this.productForm.get("productId")?.value;
      if (!productId || productId < 0) {
        console.error("Product ID is invalid for update.");
        return;
      }
      const productUpdated = this.productService.update(productId, product);
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
