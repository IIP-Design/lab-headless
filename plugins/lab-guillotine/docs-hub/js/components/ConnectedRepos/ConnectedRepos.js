import { useContext } from '@wordpress/element';

import PageSection from '../PageSection/PageSection';
import Repo from '../Repo/Repo';

import { ManageDocsContext } from 'docs-hub/context/manageDocsContext';

import './ConnectedRepos.css';

const ConnectedRepos = () => {
  const { state: { repos } } = useContext( ManageDocsContext );

  return (
    <PageSection title="Manage Connected Repositories">
      <ul className="gpalab-docs-connected-list">
        { repos && repos.map( repo => (
          <Repo key={ repo.parent } repo={ repo } />
        ) ) }
      </ul>
    </PageSection>
  );
};

export default ConnectedRepos;
