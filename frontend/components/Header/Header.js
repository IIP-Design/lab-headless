import Link from 'next/link';

import style from './Header.module.scss';

const Header = () => (
  <div className={ style.header }>
    <Link href="/">
      <a>
        <div className={ style.branding }>
          <img
            alt="U.S. Department of State seal"
            className={ style.logo }
            src="/dos-seal.png"
          />
          <strong>GPA Lab</strong>
        </div>
      </a>
    </Link>
    <nav className={ style.nav }>
      <Link href="/docs">
        Documentation
      </Link>
    </nav>
  </div>
);

export default Header;
