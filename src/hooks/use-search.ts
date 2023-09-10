import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function useSearch<T>(searchApi: Function) {
  const [search, setSearch] = useState<T[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data } = useQuery({
    queryKey: ['search', { q: searchTerm }],
    queryFn: (): T[] => searchApi({ q: searchTerm }),
    enabled: !!searchTerm,
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
  });

  return {
    search,
    setSearch,
    searchTerm,
    setSearchTerm,
    data: searchTerm ? data || [] : [],
  };
}
