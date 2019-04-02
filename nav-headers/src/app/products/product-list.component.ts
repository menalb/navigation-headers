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
    this.productService.get().subscribe(
      resp => {
        this.products = resp;
        this.hasNext = this.productService.hasNext();
        this.hasPrev = this.productService.hasPrev();
        console.log(this.hasNext)
      },
      error => console.log(error)
    );
  }

  hasNext: boolean;
  hasPrev: boolean;
  next() {
    if (this.productService.hasNext()) this.productService.moveNext();
  }
  prev() {
    if (this.productService.hasPrev()) this.productService.movePrev();
  }
}
