import { Injectable } from '@angular/core';
import { db, Product } from '../../data/product-db';
import { liveQuery } from 'dexie';
import { Observable } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getAll(): Observable<Product[]> {
    return liveQuery(() => db.products.toArray());
  }

  getByBarcode(barcode: string): Promise<Product | undefined> {
    return db.products.where({ barcode }).first();
  }

  add(product: Product): Promise<number> {
    return db.products.add(product);
  }

  update(id: number, changes: Partial<Product>): Promise<number> {
    return db.products.update(id, changes);
  }

  delete(id: number): Promise<void> {
    return db.products.delete(id);
  }
}
