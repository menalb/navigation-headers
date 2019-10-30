import { Component, OnInit, Input } from '@angular/core';

import { SimpleProductService } from './simple-product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-simple-product-box',
  templateUrl: 'simple-product-box.component.html'
})
export class SimpleProductBoxComponent implements OnInit {

  @Input() product: Product;

  constructor(private productService: SimpleProductService) {

  }

  ngOnInit() {

  }

}
