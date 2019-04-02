import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}
  baseUrl: string = "https://localhost:5001";

  get(): Observable<Product[]> {
    const url = "/api/products?page=1&pageSize=5";
    return this.getFromService(url);
  }

  getFromService(url: string) {
    return this.http
      .get<Product[]>(this.baseUrl + url, {
        observe: "response",
        headers: new HttpHeaders({ Accept: "application/json" })
      })
      .pipe(
        map(resp => {
          if (resp.headers && resp.headers.has("Link")) {
            let links = this.parse_link_header(resp.headers.get("Link"));
            this.firt = links["first"];
            this.last = links["last"];
            this.next = links["next"];
            this.prev = links["prev"];
          }
          return resp.body;
        }),
        catchError(this.handleError<Product[]>("GetProducts"))
      );
  }

  parse_link_header(header) {
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
      console.error(error);
      return of(result as T);
    };
  }
}

export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
}
