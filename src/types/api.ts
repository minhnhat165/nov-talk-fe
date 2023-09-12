// dynamic file name for api response types
export type Response<T> = {
  message: string;
  data: T;
};

// export type SingleResponse<T, K extends string = 'data'> = {
//   message: string;
// } & Record<K, T>;

export type ListResponse<T, P extends Pagination | CursorPagination> = {
  data: {
    items: T[];
    pageInfo: P;
  };
  message: string;
};

export type Pagination = {
  limit: number;
  total: number;
  currentPage: number;
  totalPages: number;
};

export type CursorPagination = {
  hasNextPage: boolean;
  endCursor: string;
};
