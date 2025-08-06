import { NgFor, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'dexie';
import { Product } from '../data/product-db';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgFor, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();
  }

  deleteProduct(id: number) {
    this.productService.delete(id);
  }
}
