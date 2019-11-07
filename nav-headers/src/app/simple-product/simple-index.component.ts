import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-simple-index',
  template: `
  <div>
        <app-product-add></app-product-add>
    </div>
    <div>
    <app-simple-product-list></app-simple-product-list>
    </div>
    `
})
export class SimpleIndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
