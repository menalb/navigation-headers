import { Component, OnInit, Input } from '@angular/core';

import { SimpleProductService } from './simple-product.service';
import { Product, SimpleOperationResult, FailureOperationResult } from '../product.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-product-box',
  templateUrl: 'simple-product-box.component.html'
})
export class SimpleProductBoxComponent implements OnInit {

  @Input() product: Product;
  isEditMode = false;
  productForm: FormGroup;
  errorMessage = '';
  defaultErrorMessage = 'Invalid Product name';

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
    ev.stopPropagation();
    const updatedProduct = { ...this.product, name: this.productForm.value.name };
    this.productService.update(updatedProduct).subscribe(this.handleSuccess, this.handleFailure);
  }

  delete(ev) {
    ev.stopPropagation();
    const updatedProduct = { ...this.product, name: this.productForm.value.name };
    this.productService.delete(updatedProduct).subscribe(this.handleSuccess, this.handleFailure);
  }

  cancel(ev) {
    this.isEditMode = false;
    ev.stopPropagation();
  }

  private handleSuccess() {
    this.isEditMode = false;
  }

  private handleFailure(response: FailureOperationResult): void {
    this.isEditMode = true;
    this.errorMessage = response.message;

  }
}
