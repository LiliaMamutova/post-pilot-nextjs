import css from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p className={css.text}>© {new Date().getFullYear()} Postly. All rights reserved.</p>
        <div className={css.wrap}>
          <p className={css.text}>Developer: Lilia Mamutova</p>
          <p className={css.text}>
            Contact us: &nbsp;
            <Link href="https://github.com/LiliaMamutova">LiliaMamutova</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
