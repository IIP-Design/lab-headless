import Link from 'next/link';
import propTypes from 'prop-types';

import style from './RepoList.module.scss';

const RepoList = ( { repos } ) => (
  <ul className={ style.list }>
    { repos && repos.map( repo => (
      <li key={ repo.name }>
        <Link href={ `docs/${repo.slug}` }>
          <a>{ repo.name }</a>
        </Link>
      </li>
    ) ) }
  </ul>
);

RepoList.propTypes = {
  repos: propTypes.arrayOf(
    propTypes.shape( {
      name: propTypes.string,
      slug: propTypes.string,
    } ),
  ),
};

export default RepoList;
