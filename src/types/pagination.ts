export type CursorPagination = {
  hasNextPage: boolean;
  endCursor: string;
};

export type OffsetPagination = {
  limit: number;
  total: number;
  currentPage: number;
  totalPages: number;
};
