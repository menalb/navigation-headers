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

export interface SuccessOperationResult {
  type: 'success';
  code: 'ok' | 'created';
}

export interface FailureOperationResult {
  type: 'failure';
  code: 'invalid' | 'duplicate'  | 'ko';
  message?: string;
}

export type SimpleOperationResult = SuccessOperationResult | FailureOperationResult;
