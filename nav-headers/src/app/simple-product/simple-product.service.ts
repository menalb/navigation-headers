import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Product, AddProductCommand } from '../product.model';

export interface SimpleOperationResult {
  type: 'success' | 'failure';
  errorMessage?: string;
}

@Injectable()
export class SimpleProductService {
  private updatedProduct = new Subject<Product>();
  updatedProduct$ = this.updatedProduct.asObservable();

  constructor(private http: HttpClient) {
  }

  notifyUpdate(product: Product) {
    this.updatedProduct.next(product);
  }

  buildHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  get(): Observable<Product[]> {
    return this.http
      .get<Product[]>(environment.productsUrl + '?page=1&pageSize=100', {
        observe: 'response',
        headers: this.buildHeaders()
      })
      .pipe(map(resp => resp.body),
        catchError(this.handleError<Product[]>('GetProducts'))
      );
  }

  add(product: Product): Observable<SimpleOperationResult> {
    return this.http.post<Product>(
      environment.productsUrl,
      product,
      { headers: this.buildHeaders() })
      .pipe(
        map(addedProduct => {
          this.notifyUpdate(addedProduct);
          return this.success();
        }),
        catchError(this.handleOperationError('AddProduct'))
      );
  }


  update(product: Product): Observable<SimpleOperationResult> {
    return this.http.put<Product>(
      `${environment.productsUrl}/${product.id}`,
      product,
      { headers: this.buildHeaders() })
      .pipe(
        map(updatedProduct => {
          this.notifyUpdate(updatedProduct);
          return this.success();
        }),
        catchError(this.handleOperationError('UpdateProduct'))
      );
  }

  delete(product: Product): Observable<SimpleOperationResult> {
    return this.http.delete(
      `${environment.productsUrl}/${product.id}`,
      { headers: this.buildHeaders() })
      .pipe(
        map(response => {
          this.notifyUpdate(product);
          return this.success();
        }),
        catchError(this.handleOperationError('UpdateProduct'))
      );
  }

  success = (): SimpleOperationResult => {
    return { type: 'success' };
  }

  private handleOperationError(operation = 'operation'): (error: any) => Observable<SimpleOperationResult> {
    return (error: any): Observable<SimpleOperationResult> => {
      console.error(`${operation} failed: ${error}`);
      return of(this.buildResult(error));
    };
  }

  private buildResult(error: any): SimpleOperationResult {
    switch (error.status) {
      case 400: return { type: 'failure', errorMessage: 'Invalid Data' };
      case 409: return { type: 'failure', errorMessage: 'Data already in the store' };
    }
    return { type: 'failure' };
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}
