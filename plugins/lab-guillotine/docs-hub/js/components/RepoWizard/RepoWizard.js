import propTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

import { getBranches, getRepoFiles } from '../../api';

import Tree from '../Tree/Tree';

import './RepoWizard.css';

const RepoWizard = ( { owner: defaultOwner, token } ) => {
  const [branch, setBranch] = useState( '' );
  const [branches, setBranches] = useState( null );
  const [branchSet, setBranchSet] = useState( false );
  const [owner, setOwner] = useState( defaultOwner );
  const [repo, setRepo] = useState( '' );
  const [subdirectory, setSubdirectory] = useState( '' );
  const [subdirSet, setSubdirSet] = useState( false );
  const [tree, setTree] = useState( null );

  const handleInput = ( e, control ) => {
    const { value } = e.target;

    switch ( control ) {
      case 'branch':
        setBranch( value );
        break;
      case 'owner':
        setOwner( value );
        break;
      case 'repo':
        setRepo( value );
        break;
      case 'subdir':
        setSubdirectory( value );
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
      { owner, repo },
      token,
      branch,
      subdirectory,
    );

    setTree( repoTree );
  };

  const reset = () => {
    setBranch( '' );
    setBranches( null );
    setBranchSet( false );
    setOwner( defaultOwner );
    setRepo( '' );
    setSubdirectory( '' );
    setSubdirSet( false );
    setTree( null );
  };

  return (
    <div className="gpalab-docs-wizard-container">
      <div className="gpalab-docs-wizard-section">
        <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-owner">
          { `${__( 'Identify repo owner', 'gpalab-guillotine' )}:` }
          <input id="gpalab-docs-owner" type="text" value={ owner } onChange={ e => handleInput( e, 'owner' ) } />
        </label>
      </div>
      <div className="gpalab-docs-wizard-section">
        <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-repo">
          { `${__( 'Add the repo name', 'gpalab-guillotine' )}:` }
          <input
            disabled={ !!branch }
            id="gpalab-docs-repo"
            type="text"
            value={ repo }
            onChange={ e => handleInput( e, 'repo' ) }
          />
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
      { branches && (
        <div className="gpalab-docs-wizard-section">
          <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-default-branch">
            { `${__( 'Choose the branch', 'gpalab-guillotine' )}:` }
            <select
              disabled={ !!branchSet }
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
          <button
            className="gpalab-docs-wizard-button"
            disabled={ !!branchSet }
            type="button"
            onClick={ () => setBranchSet( true ) }
          >
            { __( 'Use This Branch', 'gpalab-guillotine' ) }
          </button>
        </div>
      ) }
      { branchSet && (
        <div className="gpalab-docs-wizard-section">
          <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-subdir">
            { `${__( 'Search sub-directory', 'gpalab-guillotine' )}:` }
            <input
              disabled={ !!subdirSet }
              id="gpalab-docs-subdir"
              type="text"
              value={ subdirectory }
              onChange={ e => handleInput( e, 'subdir' ) }
            />
          </label>
          <button
            className="gpalab-docs-wizard-button"
            disabled={ !!subdirSet }
            type="button"
            onClick={ () => setSubdirSet( true ) }
          >
            { subdirectory ? __( 'Search This Directory', 'gpalab-guillotine' ) : __( 'No, Search Root', 'gpalab-guillotine' ) }
          </button>
        </div>
      ) }
      { tree && (
        <div className="gpalab-docs-tree-container">
          <strong>{ `${__( 'Results', 'gpalab-guillotine' )}:` }</strong>
          <Tree
            changelog={ tree.changelog }
            readme={ tree.readme }
            tree={ tree.docs }
          />
        </div>
      ) }

      <div className="gpalab-docs-wizard-controls">
        <button
          className="gpalab-docs-wizard-button"
          style={ { padding: '0.3rem 0' } }
          type="button"
          onClick={ () => reset() }
        >
          { __( 'Reset Form', 'gpalab-guillotine' ) }
        </button>

        <button
          className="gpalab-docs-wizard-button"
          style={ { display: subdirSet && !tree ? 'block' : 'none', padding: '0.3rem 0' } }
          type="button"
          onClick={ () => getTree() }
        >
          { __( 'Get Repo File Tree', 'gpalab-guillotine' ) }
        </button>
      </div>

    </div>
  );
};

RepoWizard.propTypes = {
  owner: propTypes.string,
  token: propTypes.string,
};

export default RepoWizard;
