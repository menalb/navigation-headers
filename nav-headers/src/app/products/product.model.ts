export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
}

export interface ApiConfig {
  baseUrl: string;
  endpoint: string;
}
