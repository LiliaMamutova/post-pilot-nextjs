'use client';

import Modal from '@/components/Modal/Modal';
import css from './PostPreview.module.css';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import useFetchPosts from '@/queries/posts';
import { useEffect, useState } from 'react';
import { fetchUserById } from '@/lib/api';
import { User } from '@/types/user';

interface PostPreviewClientProps {
  id: number;
}

export default function PostPreviewClient({id}: PostPreviewClientProps) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null)
  const { data: post, isError: isPostError, isLoading: isPostLoading, } = useFetchPosts(id);


  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    if(!post) return;

    const getUserId = async () => {
      const fetchUser = await fetchUserById(post?.userId);
      setUser(fetchUser)
    };
    getUserId();
  }, [post]);


  if(isPostLoading )
    return (
      <Modal onClose={handleClose}>
        <Loading />
      </Modal>
    )

  if(isPostError || !post)
    return (
      <Modal onClose={handleClose}>
        <p>Something went wrong</p>
      </Modal>
    );

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
        <p className={css.user}>{user?.name}</p>
      </div>
    </Modal>
  );
}
