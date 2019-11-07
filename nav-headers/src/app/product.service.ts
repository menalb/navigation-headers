import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ApiConfig, AddProductCommand, FailureOperationResult, SuccessOperationResult } from './product.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {

  config: ApiConfig;
  constructor(private http: HttpClient) {

    this.config = {
      baseUrl: environment.baseUrl,
      endpoint: environment.endpoint
    };
  }

  buildHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  add(product: AddProductCommand): Observable<SuccessOperationResult | FailureOperationResult> {
    return this.http.post<Product>(this.config.baseUrl + this.config.endpoint, product, { headers: this.buildHeaders() })
      .pipe(
        map(_ => this.success()),
        catchError(this.handleOperationError('AddProduct'))
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

  get(): Observable<Product[]> {
    return this.getFromService(this.config.endpoint);
  }

  getFromService(url: string) {
    return this.http
      .get<Product[]>(this.config.baseUrl + url, {
        observe: 'response',
        headers: new HttpHeaders({ Accept: 'application/json' })
      })
      .pipe(
        map(resp => {
          if (resp.headers && resp.headers.has('Link')) {
            this.build_links(resp.headers.get('Link'));
          }

          return resp.body;
        }),
        catchError(this.handleError<Product[]>('GetProducts'))
      );
  }
  build_links(header: string) {
    let links = this.parse_link_header(header);
    this.firt = links['first'];
    this.last = links['last'];
    this.next = links['next'];
    this.prev = links['prev'];
  }
  parse_link_header(header: string) {
    if (header.length === 0) {
      return;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach(p => {
      let section = p.split(";");
      var url = section[0].replace(/<(.*)>/, "$1").trim();
      var name = section[1].replace(/rel="(.*)"/, "$1").trim();
      links[name] = url;
    });
    return links;
  }

  moveNext(): Observable<Product[]> {
    return this.getFromService(this.next);
  }
  movePrev(): Observable<Product[]> {
    return this.getFromService(this.prev);
  }
  moveLast(): Observable<Product[]> {
    return this.getFromService(this.last);
  }
  moveFirst(): Observable<Product[]> {
    return this.getFromService(this.firt);
  }

  firt?: string;
  last?: string;
  next?: string;
  prev?: string;

  hasNext = () => (this.next ? true : false);
  hasPrev = () => (this.prev ? true : false);
  hasFirst = () => (this.firt ? true : false);
  hasLast = () => (this.last ? true : false);


}
