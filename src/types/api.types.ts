export interface ApiResponse<TData> {
  success: boolean;
  message: string;
  data: TData;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totolPages: number;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
}