'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const setQueryParams = useCallback(
    (name: string, value: string) => {
      const queryString = createQueryString(name, value);
      router.push(`${pathname}?${queryString}`);
    },
    [createQueryString, pathname, router],
  );
  return {
    setQueryParams,
    pathname,
    createQueryString,
  };
};
