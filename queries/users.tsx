import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchUserById } from '@/lib/api';


export default function useFetchUser(userId: number) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn:() => fetchUserById(userId),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })
}