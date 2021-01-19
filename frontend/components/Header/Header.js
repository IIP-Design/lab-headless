import Link from 'next/link';

import style from './Header.module.scss';

const Header = () => (
  <div className={ style.header }>
    <Link href="/">
      <img
        alt="U.S. Department of State seal"
        className={ style.logo }
        src="/dos-seal.png"
      />
    </Link>
  </div>
);

export default Header;
