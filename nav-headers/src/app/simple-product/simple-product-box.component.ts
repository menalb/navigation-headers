import { Component, OnInit, Input } from '@angular/core';

import { SimpleProductService } from './simple-product.service';
import { Product } from '../product.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-product-box',
  templateUrl: 'simple-product-box.component.html'
})
export class SimpleProductBoxComponent implements OnInit {

  @Input() product: Product;
  isEditMode = false;
  productForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private productService: SimpleProductService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.productForm = this.formBuilder.group({
      name: new FormControl(this.product.name, Validators.required)
    });
  }
  boxClick(ev) {
    if (!this.isEditMode) {
      this.isEditMode = true;
      this.buildForm();
    }
  }
  save(ev) {
    this.isEditMode = false;
    ev.stopPropagation();
  }
  cancel(ev) {
    this.isEditMode = false;
    ev.stopPropagation();
  }
}
