import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  get(): Observable<Product[]> {
    const url = "https://localhost:5001/api/products?page=1&pageSize=5";
    return this.http
      .get<Product[]>(url, {
        observe: "response",
        headers: new HttpHeaders({ Accept: "application/json" })
      })
      .pipe(
        map(resp => {
          if (resp.headers && resp.headers.has("Link"))
            console.log(resp.headers.get("Link"));
          else console.log("no links");
          return resp.body;
        }),

        catchError(this.handleError<Product[]>("GetProducts"))
      );
  }

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
