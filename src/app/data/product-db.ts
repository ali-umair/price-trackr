import Dexie, { Table } from 'dexie';

export interface Product {
  id?: number;
  barcode: string;
  name: string;
  description: string;
}

export class ProductDB extends Dexie {
  products!: Table<Product, number>;

  constructor() {
    super('barcodeScannerDB');
    this.version(1).stores({
      products: '++id, barcode, name',
    });
  }
}

export const db = new ProductDB();
