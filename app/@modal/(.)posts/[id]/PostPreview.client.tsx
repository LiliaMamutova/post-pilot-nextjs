'use client';

// import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
// import { fetchPostById, fetchUserById } from '@/lib/api';
// import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import useFetchPosts from '@/queries/posts';


export default function PostPreviewClient() {
  const router = useRouter();
  const params = useParams<{id: string}>();
  const id = Number(params.id);

  const { data: post, isError: isPostError, isLoading: isPostLoading, } = useFetchPosts(id);
  const { data: user, isError: isUserError, isLoading: isUserLoading, } = useFetchPosts(post!.userId);


  const handleClose = () => {
    router.back();
  };

  if(isPostLoading || isUserLoading)
    return (
      <Modal onClose={handleClose}>
        <Loading />
      </Modal>
    )

  if(isPostError || isUserError || !post)
    return (
      <Modal onClose={handleClose}>
        <p>Something went wrong</p>
      </Modal>
    );


  // useEffect(() => {
  //   const getUserId = async (userId: number) => {
  //     await fetchUserById(userId)
  //   };
  //
  // }, []);



  return (
    <Modal onClose={handleClose}>
      <button className={css.backBtn} type="button" onClick={handleClose}>← Back</button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>{post.title}</h2>
          </div>

          <p className={css.content}>{post.body}</p>
        </div>
        <p className={css.user}>{user!.userId}</p>
      </div>
    </Modal>
  );
}
