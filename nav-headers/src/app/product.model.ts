export interface Product {
  id: number;
  code: string;
  name: string;
}

export interface AddProductCommand {
  name: string;
}

export interface ApiConfig {
  baseUrl: string;
  endpoint: string;
}
