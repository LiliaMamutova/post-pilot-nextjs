'use client';

import css from './PostDetails.module.css';
import { useParams, useRouter } from 'next/navigation';
import useFetchPosts from '@/queries/posts';

import Loading from '@/app/loading';
import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { fetchUserById } from '@/lib/api';

export default function PostDetailsClient() {
  const params = useParams<{id: string}>();
  const id = Number(params.id);

  const router = useRouter();

  const { data: post,
    isLoading: isPostLoading,
    isError: isPostError
  } = useFetchPosts(id);

  const { data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useQuery({
    queryKey: ["user", post?.userId],
    queryFn:() => fetchUserById(post!.userId),
   enabled: Boolean(post?.userId),
  })

  const handleClickBack = () => {
    router.back();
  };

  if(isPostLoading && isUserLoading)
    return (
      <Modal onClose={handleClickBack}>
        <Loading />
      </Modal>
    );

  if(isPostError || isUserError || !post)
    return (
      <Modal onClose={handleClickBack}>
        <p>Something went wrong</p>
      </Modal>
    );


  // useEffect(() => {
  //   const fn = async () => {};
  //   fn();
  // }, []);

  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <button className={css.backBtn} onClick={handleClickBack}>← Back</button>

            <div className={css.post}>
              <div className={css.wrapper}>
                <div className={css.header}>
                  <h2>{post.title}</h2>
                </div>

                <p className={css.content}>{post.body}</p>
              </div>
              <p className={css.user}>Author: ${user?.name} </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
