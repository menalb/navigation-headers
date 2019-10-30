import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { SimpleProductListComponent } from './simple-product/simple-product.component';
import { SimpleProductService } from './simple-product/simple-product.service';
import { ProductAddComponent } from './product-add/product-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleIndexComponent } from './simple-product/simple-index.component';
import { SimpleProductBoxComponent } from './simple-product/simple-product-box.component';

export const appRoutes: Routes = [
  { path: 'simple', component: SimpleIndexComponent },
  { path: '', component: ProductListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SimpleProductListComponent,
    ProductAddComponent,
    SimpleIndexComponent,
    SimpleProductBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ProductService, SimpleProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

