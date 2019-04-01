import { Component, OnInit } from "@angular/core";
import { ProductService, Product } from "./product.service";

@Component({
  selector: "product-list",
  template: `
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Code</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let product of products">
          <td>{{product.id}}</td>
          <td>{{product.code}}</td>
          <td>{{product.name}}</td>
          <td>{{product.description}}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}
  products: Product[];

  ngOnInit() {
    this.productService
      .get()
      .subscribe(resp => (this.products = resp), error => console.log(error));
  }
}
