// dynamic file name for api response types
export type SingleResponse<T, K extends string = 'data'> = {
  message: string;
} & Record<K, T>;
export type ListResponse<T, P extends Pagination | CursorPagination> = {
  data: {
    items: T[];
    pageInfo: P;
  };
  message: string;
};

type Pagination = {
  limit: number;
  total: number;
  currentPage: number;
  totalPages: number;
};

type CursorPagination = {
  hasMore: boolean;
  endCursor: string;
};
