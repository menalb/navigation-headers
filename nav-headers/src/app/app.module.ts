import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ProductService } from './products/product.service';
import { HttpClientModule } from '@angular/common/http';
import { SimpleProductListComponent } from './simple-product/simple-product.component';
import { SimpleProductService } from './simple-product/simple-product.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SimpleProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService, SimpleProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
