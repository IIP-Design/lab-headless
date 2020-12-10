import propTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

import { getBranches, getRepoFiles } from '../../api';

import Tree from '../Tree/Tree';

import './RepoWizard.css';

const RepoWizard = ( { owner, token } ) => {
  const [repo, setRepo] = useState( '' );
  const [branch, setBranch] = useState( '' );
  const [branches, setBranches] = useState( null );
  const [tree, setTree] = useState( null );

  const handleInput = ( e, control ) => {
    const { value } = e.target;

    switch ( control ) {
      case 'repo':
        setRepo( value );
        break;
      case 'branch':
        setBranch( value );
        break;
      default:
    }
  };

  const getBranch = async () => {
    const { branches: allBranches, defaultBranch } = await getBranches(
      { owner, repo },
      token,
    );

    setBranches( allBranches );
    setBranch( defaultBranch );
  };

  const getTree = async () => {
    const repoTree = await getRepoFiles(
      { owner, repo, dir: `${branch}:docs/` },
      token,
      branch,
    );

    setTree( repoTree );
  };

  return (
    <div className="gpalab-docs-wizard-container">
      <div className="gpalab-docs-wizard-section">
        <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-repo">
          { `${__( 'Add the repo name', 'gpalab-guillotine' )}:` }
          <input id="gpalab-docs-repo" type="text" value={ repo } onChange={ e => handleInput( e, 'repo' ) } />
        </label>
        { repo && (
          <button
            className="gpalab-docs-wizard-button"
            type="button"
            disabled={ !!branch }
            onClick={ () => getBranch() }
          >
            { __( 'Get GitHub Branches', 'gpalab-guillotine' ) }
          </button>
        ) }
      </div>
      <div className="gpalab-docs-wizard-section">
        { branches && (
          <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-default-branch">
            { `${__( 'Get GitHub Branches', 'gpalab-guillotine' )}:` }
            <select
              id="gpalab-docs-default-branch"
              value={ branch }
              onBlur={ e => handleInput( e, 'branch' ) }
              onChange={ e => handleInput( e, 'branch' ) }
            >
              { branches.map( branchRef => (
                <option key={ branchRef } value={ branchRef }>{ branchRef }</option>
              ) ) }
            </select>
          </label>
        ) }
        { branch && (
          <button
            className="gpalab-docs-wizard-button"
            type="button"
            onClick={ () => getTree() }
          >
            { __( 'Get Repo File Tree', 'gpalab-guillotine' ) }
          </button>
        ) }
      </div>
      { tree && (
        <div className="gpalab-docs-tree-container">
          <strong>{ `${__( 'Results', 'gpalab-guillotine' )}:` }</strong>
          <Tree
            changelog={ tree.changelog }
            readme={ tree.readme }
            tree={ tree.tree }
          />
        </div>
      ) }
    </div>
  );
};

RepoWizard.propTypes = {
  owner: propTypes.string,
  token: propTypes.string,
};

export default RepoWizard;
