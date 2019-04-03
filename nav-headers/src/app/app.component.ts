import { Component } from "@angular/core";
import { ApiConfig } from "./products/product.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "nav-headers";
  apiConfig: ApiConfig = {
    baseUrl: "https://localhost:5001",
    endpoint: "/api/products?page=1&pageSize=5"
  };
}
