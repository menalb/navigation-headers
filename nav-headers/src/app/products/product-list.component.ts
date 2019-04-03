import { Component, OnInit, Input } from "@angular/core";
import { ProductService } from "./product.service";
import { Product, ApiConfig } from "./product.model";
import { Observable } from "rxjs";

@Component({
  selector: "product-list",
  templateUrl: "product-list.component.html"
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}
  @Input() gridConfiguration: ApiConfig;
  products: Product[];
  hasNext: boolean;
  hasPrev: boolean;

  ngOnInit() {
    this.withNav(this.productService.get(this.gridConfiguration));
  }
  next() {
    if (this.productService.hasNext())
      this.withNav(this.productService.moveNext());
  }
  prev() {
    if (this.productService.hasPrev())
      this.withNav(this.productService.movePrev());
  }
  last() {
    if (this.productService.hasNext())
      this.withNav(this.productService.moveLast());
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
