import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Product, AddProductCommand } from '../product.model';
import { FailureOperationResult, SuccessOperationResult, SimpleOperationResult } from '../product.model';

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
      .pipe(
        map(resp => resp.body),
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
      // `${environment.productsUrl}/${product.id}`,
      environment.productsUrl + '/' + product.id,
      { headers: this.buildHeaders() })
      .pipe(
        map(response => {
          this.notifyUpdate(product);
          return this.success();
        }),
        catchError(this.handleOperationError('DeleteProduct'))
      );
  }

  private handleOperationError(operation = 'operation'): (error: any) => Observable<FailureOperationResult> {
    return (error: any): Observable<FailureOperationResult> => {

      return this.buildResult(operation, error);
    };
  }

  private buildResult(operation: string, error: any): Observable<never> {
    switch (error.status) {
      case 400: return throwError({ ...this.failure('failed'), code: 'invalid' });
      case 409: return throwError({ ...this.failure('failed'), code: 'duplicate' });
    }
    return throwError(error);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }

  success = (): SuccessOperationResult => {
    return { type: 'success', code: 'ok' };
  }

  failure = (errorMessage: string): FailureOperationResult => {
    return { type: 'failure', message: errorMessage, code: 'ko' };
  }


}
