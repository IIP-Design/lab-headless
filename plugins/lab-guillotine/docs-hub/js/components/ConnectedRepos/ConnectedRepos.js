import propTypes from 'prop-types';

import PageSection from '../PageSection/PageSection';

import './ConnectedRepos.css';

const ConnectedRepos = ( { repos } ) => (
  <PageSection title="Manage Connected Repositories">
    <ul className="gpalab-docs-connected-list">
      { repos && repos.map( repo => (
        <li key={ repo.parent } className="gpalab-docs-connected-list-item">
          <strong>{ repo.title }</strong>
        </li>
      ) ) }
    </ul>
  </PageSection>
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
