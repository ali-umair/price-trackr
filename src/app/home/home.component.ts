import { NgFor, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'dexie';
import { Product } from '../data/product-db';
import { ProductService } from '../shared/services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ NgFor, AsyncPipe, RouterLink ],
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
