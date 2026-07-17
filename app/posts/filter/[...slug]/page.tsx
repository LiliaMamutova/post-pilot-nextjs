import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchPosts } from '@/lib/api';
import PostsClient from '@/app/posts/filter/[...slug]/Posts.client';
import { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const userId = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['post', '', 1, userId],
    queryFn: () => fetchPosts({ searchText: '', page: 1, userId }),

  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsClient userId={userId} />
    </HydrationBoundary>
  );
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const userId = slug[0]
                                  ? undefined
                                  : Number(slug[0]);

  const title = userId ? `Posts - ${userId}` : `Posts - All Users`

  return { title };
  // повертає об’єкт типу Metadata
}