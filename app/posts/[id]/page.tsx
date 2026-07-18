import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostDetailsClient from './PostDetails.client';
import { fetchPostById } from '@/lib/api';


interface PostDetailsProps {
  params: Promise<{id: string}>;
}

export default async function PostDetails({ params }: PostDetailsProps) {
  const { id } = await params;
  // const idP = Number(id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(Number(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailsClient />
    </HydrationBoundary>
  );
}


// export async function generateMetadata({params}: PostDetailsProps): Promise<Metadata> {
//   const { id } = await params;
//
//   const post = await fetchPostById(Number(id));
//
//   return {
//     title: post.title,
//     description: post.body.slice(0, 30),
//   };
// }