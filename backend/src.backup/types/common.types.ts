export interface Pagination {

  page: number;

  limit: number;

}

export interface ApiResponse<T> {

  success: boolean;

  message: string;

  data?: T;

}

export interface PaginationResult<T> {

  items: T[];

  total: number;

  page: number;

  limit: number;

}
