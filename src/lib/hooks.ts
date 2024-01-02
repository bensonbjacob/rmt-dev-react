import { useState, useEffect } from 'react';
import { JobItem, JobItemExpanded } from './types';
import { BASE_API_URL } from './constants';
import { useQuery } from '@tanstack/react-query';

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

const fetchJobItem = async (
  id: number
): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  const data = await response.json();
  return data;
};

export function useActiveId() {
  const [activeID, setActiveID] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveID(id);
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () =>
      window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return activeID;
}

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ['job-item', id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: () => {},
    }
  );
  const jobItem = data?.jobItem;
  const isLoading = isInitialLoading;
  return { jobItem, isLoading } as const;
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfResults = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_API_URL}?search=${searchText}`
      );
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };

    fetchData();
  }, [searchText]);

  return { jobItemsSliced, isLoading, totalNumberOfResults } as const;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}
