import propTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

import { getDefaultBranch, getRepoFiles } from '../api';

const RepoWizard = ( { owner, token } ) => {
  const [repo, setRepo] = useState( '' );
  const [branch, setBranch] = useState( '' );
  const [tree, setTree] = useState( {} );

  const handleInput = e => {
    const { value } = e.target;

    setRepo( value );
  };

  const getBranch = async () => {
    const defaultBranch = await getDefaultBranch(
      { owner, repo },
      token,
    );

    setBranch( defaultBranch );
  };

  const getTree = async () => {
    const repoTree = await getRepoFiles(
      { owner, repo, dir: `${branch}:docs/` },
      token,
    );

    setTree( repoTree );
  };

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <label htmlFor="gpalab-docs-repo">
        { __( 'Add the repo name', 'gpalab-guillotine' ) }
        <input type="text" value={ repo } onChange={ handleInput } />
      </label>
      { repo && (
        <button
          type="button"
          disabled={ !!branch }
          onClick={ () => getBranch() }
        >
          { __( 'Get Default Branch', 'gpalab-guillotine' ) }
        </button>
      ) }
      { branch && (
        <button
          type="button"
          onClick={ () => getTree() }
        >
          Get Repo
        </button>
      ) }
    </div>
  );
};

RepoWizard.propTypes = {
  owner: propTypes.string,
  token: propTypes.string,
};

export default RepoWizard;
