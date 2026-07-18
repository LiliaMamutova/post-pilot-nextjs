'use client';

import css from './PostDetails.module.css';
import useFetchPosts from '@/queries/posts';
import Loading from '@/app/loading';
import { User } from '@/types/user';
import { fetchUserById } from '@/lib/api';

import { useState } from 'react';
import {useEffect} from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PostDetailsClient() {
  const params = useParams<{id: string}>();
  const id = Number(params.id);

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const { data: post,
    isLoading: isPostLoading,
    isError: isPostError
  } = useFetchPosts(id);


  const handleClickBack = () => {
    router.back();
  };

  useEffect(() => {
    if(!post) return;

    const fetchUserId = async () => {
      const fetchUser = await fetchUserById(post?.userId);
      setUser(fetchUser);
    };
    fetchUserId ();
  }, [post]);


  if(isPostLoading )  // && isUserLoading
    return (
        <Loading />
    );

  if(isPostError || !post) // || isUserError
    return (
        <p>Something went wrong</p>
    );


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
