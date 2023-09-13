import { CursorPagination, OffsetPagination } from './pagination';

// dynamic file name for api response types
export type Response<T> = {
  message: string;
  data: T;
};

// export type SingleResponse<T, K extends string = 'data'> = {
//   message: string;
// } & Record<K, T>;

export type ListResponse<T, P extends OffsetPagination | CursorPagination> = {
  items: T[];
  pageInfo: P;
};
