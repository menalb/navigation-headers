import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SimpleProductService, SimpleOperationResult } from '../simple-product/simple-product.service';
import { Product } from '../product.model';

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

      this.productService.add(product).subscribe(_ => this.handleAddResponse(_));
    } else {
      this.errorMessage = this.defaultErrorMessage;
    }
  }

  handleAddResponse(response: SimpleOperationResult): void {
    this.isAddMode = (response.type !== 'success');
    if (response.type === 'failure') {
      this.errorMessage = response.errorMessage;
    }
  }

  cancel(): void {
    this.isAddMode = false;
  }
}
