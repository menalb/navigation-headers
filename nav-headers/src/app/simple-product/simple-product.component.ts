import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { SimpleProductService } from './simple-product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-simple-product-list',
  templateUrl: 'simple-product-list.component.html'
})
export class SimpleProductListComponent implements OnInit {
  products: Product[];

  constructor(private productService: SimpleProductService) { }

  ngOnInit() {
    this.productService.get().subscribe(prods => this.products = prods);
  }
}
