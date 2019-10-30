import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Product } from '../products/product.model';

@Injectable()
export class SimpleProductService {

  constructor(private http: HttpClient) {
  }

  buildHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  get(): Observable<Product[]> {
    return this.http
      .get<Product[]>(environment.productsUrl, {
        observe: 'response',
        headers: this.buildHeaders()
      })
      .pipe(map(resp => resp.body),
        catchError(this.handleError<Product[]>('GetProducts'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}
