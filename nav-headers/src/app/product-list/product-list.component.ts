import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[];
  hasNext: boolean;
  hasPrev: boolean;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.withNav(this.productService.get());
  }
  next() {
    if (this.productService.hasNext()) {
      this.withNav(this.productService.moveNext());
    }
  }
  prev() {
    if (this.productService.hasPrev()) {
      this.withNav(this.productService.movePrev());
    }
  }
  last() {
    if (this.productService.hasNext()) {
      this.withNav(this.productService.moveLast());
    }
  }
  first() {
    this.withNav(this.productService.moveFirst());
  }

  private withNav(next: Observable<Product[]>) {
    next.subscribe(
      resp => this.handleNavigation(resp),
      error => console.log(error)
    );
  }

  private handleNavigation(resp: Product[]) {
    this.products = resp;
    this.hasNext = this.productService.hasNext();
    this.hasPrev = this.productService.hasPrev();
  }
}
