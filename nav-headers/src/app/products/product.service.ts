import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Product, ApiConfig } from "./product.model";

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}
  private baseUrl: string;

  get(config: ApiConfig): Observable<Product[]> {
    this.baseUrl = config.baseUrl;
    return this.getFromService(config.endpoint);
  }

  getFromService(url: string) {
    return this.http
      .get<Product[]>(this.baseUrl + url, {
        observe: "response",
        headers: new HttpHeaders({ Accept: "application/json" })
      })
      .pipe(
        map(resp => {
          if (resp.headers && resp.headers.has("Link"))
            this.build_links(resp.headers.get("Link"));

          return resp.body;
        }),
        catchError(this.handleError<Product[]>("GetProducts"))
      );
  }
  build_links(header: string) {
    let links = this.parse_link_header(header);
    this.firt = links["first"];
    this.last = links["last"];
    this.next = links["next"];
    this.prev = links["prev"];
  }
  parse_link_header(header: string) {
    if (header.length == 0) {
      return;
    }

    let parts = header.split(",");
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

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}
