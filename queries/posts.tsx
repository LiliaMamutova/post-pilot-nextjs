import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPostById } from '@/lib/api';

export default function useFetchPosts(id: number) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })
}



