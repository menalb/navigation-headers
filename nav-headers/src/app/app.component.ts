import { Component } from '@angular/core';
import { ProductService } from './products/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nav-headers';
  constructor(private productService: ProductService) {

  }
  add(ev) {
    this.productService.add({
      code: '123',
      id: 123,
      name: 'Foo'
    }).subscribe(x => x);
  }
}
