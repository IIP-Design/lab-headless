import propTypes from 'prop-types';

import { i18nize } from '../../../../js/shared/utils/helpers';

import './ConnectedRepos.css';

const ConnectedRepos = ( { repos } ) => (
  <div className="gpalab-docs-connected-container">
    <h2 className="gpalab-docs-connected-title">{ i18nize( 'Manage Connected Repositories:' ) }</h2>
    <ul className="gpalab-docs-connected-list">
      { repos && repos.map( repo => (
        <li key={ repo.parent } className="gpalab-docs-connected-list-item">
          <strong>{ repo.title }</strong>
        </li>
      ) ) }
    </ul>
  </div>
);

ConnectedRepos.propTypes = {
  repos: propTypes.arrayOf(
    propTypes.shape( {
      branch: propTypes.string,
      owner: propTypes.string,
      parent: propTypes.string,
      repo: propTypes.string,
      subdir: propTypes.string,
      title: propTypes.string,
    } ),
  ),
};

export default ConnectedRepos;
