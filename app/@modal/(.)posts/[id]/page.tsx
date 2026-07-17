import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import PostPreviewClient from "@/app/@modal/(.)posts/[id]/PostPreview.client";
import { fetchPostById } from '@/lib/api';
// import { fetchPostById } from '@/lib/api';

interface PostPreviewProps {
  params: Promise<{id: number}>;
}

export default async function PostPreview({ params }: PostPreviewProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPreviewClient id={id}/>
    </HydrationBoundary>
  );
}
