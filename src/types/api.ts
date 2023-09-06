export type SingleResponse<T> = {
  message: string;
} & (
  | {
      data: T;
    }
  | {
      status: number;
    }
);

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
