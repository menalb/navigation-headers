import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SimpleProductService } from '../simple-product/simple-product.service';
import { Product, FailureOperationResult } from '../product.model';

@Component({
  selector: 'app-product-add',
  templateUrl: 'product-add.component.html'
})
export class ProductAddComponent {
  isAddMode = false;
  productForm: FormGroup;
  errorMessage = '';
  defaultErrorMessage = 'Invalid Product name';

  constructor(private formBuilder: FormBuilder, private productService: SimpleProductService) {

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

      const product: Product = {
        id: 0,
        code: '',
        name: this.productForm.value.name
      };

      this.productService.add(product).subscribe(
        _ => this.isAddMode = false, // success
        error => this.handleAddresponse(error) // failure
      );
    } else {
      this.errorMessage = this.defaultErrorMessage;
    }
  }

  handleAddresponse(response: FailureOperationResult): void {

    this.isAddMode = true;
    switch (response.code) {
      case 'duplicate':
        this.errorMessage = 'Product already in the catalog';
        break;
      case 'invalid':
        this.errorMessage = this.defaultErrorMessage;
        break;
      default:
        this.errorMessage = 'Problems with the API';
    }

  }

  cancel(): void {
    this.isAddMode = false;
  }
}
