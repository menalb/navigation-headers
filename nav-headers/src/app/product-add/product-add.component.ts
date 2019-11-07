import { Component } from '@angular/core';
import { ProductService, FailureOperationResult } from '../product.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: 'product-add.component.html'
})
export class ProductAddComponent {
  isAddMode = false;
  productForm: FormGroup;
  errorMessage = '';
  defaultErrorMessage = 'Invalid Product name';

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {

    this.productForm = this.formBuilder.group({
      name: new FormControl('', Validators.required)
    });
  }
  showAddForm() {
    this.isAddMode = true;
    this.errorMessage = '';
    this.productForm.patchValue({ name: '' });
  }

  add(ev): void {
    if (this.productForm.valid) {
      this.productService.add({
        name: this.productForm.value.name
      }).subscribe(
        _ => this.isAddMode = false,
        error => this.handleAddresponse(error)
      );
    } else {
      this.errorMessage = this.defaultErrorMessage;
    }
  }

  handleAddresponse(response: FailureOperationResult): void {

    this.isAddMode = true;
    if (response.code === 'duplicate') {
      this.errorMessage = 'Product already in the catalog';
    }
    if (response.code === 'invalid') {
      this.errorMessage = this.defaultErrorMessage;
    }
  }

  cancel(): void {
    this.isAddMode = false;
  }
}
