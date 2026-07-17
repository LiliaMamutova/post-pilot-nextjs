import css from './layout.module.css';
import React from 'react';

type LayoutPostsProps = {
  children: React.ReactNode;
};

export default function LayoutPosts({ children }: LayoutPostsProps) {
  return (
    <main className={css.container}>
      <div className={css.postsWrapper}>{children}</div>
    </main>
  );
}
