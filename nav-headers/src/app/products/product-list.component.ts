import { Component, OnInit } from "@angular/core";
import { ProductService, Product } from "./product.service";

@Component({
  selector: "product-list",
  templateUrl: "product-list.component.html"
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}
  products: Product[];

  ngOnInit() {
    this.productService
      .get()
      .subscribe(
        resp => this.handleNavigation(resp),
        error => console.log(error)
      );
  }

  next() {
    if (this.productService.hasNext())
      this.productService
        .moveNext()
        .subscribe(
          resp => this.handleNavigation(resp),
          error => console.log(error)
        );
  }
  prev() {
    if (this.productService.hasPrev())
      this.productService
        .movePrev()
        .subscribe(
          resp => this.handleNavigation(resp),
          error => console.log(error)
        );
  }
  last() {
    if (this.productService.hasNext())
      this.productService
        .moveLast()
        .subscribe(
          resp => this.handleNavigation(resp),
          error => console.log(error)
        );
  }

  first() {
    if (this.productService.hasPrev())
      this.productService
        .moveFirst()
        .subscribe(
          resp => this.handleNavigation(resp),
          error => console.log(error)
        );
  }

  hasNext: boolean;
  hasPrev: boolean;
  private handleNavigation(resp: Product[]) {
    this.products = resp;
    this.hasNext = this.productService.hasNext();
    this.hasPrev = this.productService.hasPrev();
  }
}
