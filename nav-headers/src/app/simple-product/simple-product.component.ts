import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SimpleProductService } from './simple-product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-simple-product-list',
  templateUrl: 'simple-product-list.component.html'
})
export class SimpleProductListComponent implements OnInit {
  subscriptionUpdate: Subscription;
  products: Product[];

  constructor(private productService: SimpleProductService) {
    this.subscriptionUpdate =
      this.productService
        .updatedProduct$
        .subscribe((product: Product) => this.loadProductList());
  }

  ngOnInit() {
    this.loadProductList();
  }

  loadProductList() {
    this.productService.get().subscribe(prods => this.products = prods);
  }
}
