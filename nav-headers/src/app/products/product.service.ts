import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ApiConfig } from './product.model';
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

  add(product: Product): Observable<boolean> {
    return this.http.post<Product>(this.config.baseUrl + this.config.endpoint, product, { headers: this.buildHeaders() })
      .pipe(
        map(_ => true),
        catchError(this.handleError('AddProduct', false))
      );
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}
