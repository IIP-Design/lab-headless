import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';

import ProgressBar from '../ProgressBar/ProgressBar';
import Tree from '../Tree/Tree';

import { ConnectRepoContext } from '../../context/connectRepoContext';
import { getBranches, getRepoDocs } from '../../utils/api';
import { steps } from './progress-steps';

import './RepoWizard.css';

const RepoWizard = () => {
  const [tree, setTree] = useState( null );

  const {
    dispatch,
    state: { branch, branches, branchSet, owner, repo, subdirectory, subdirSet, token },
  } = useContext( ConnectRepoContext );

  const handleInput = ( e, control ) => {
    const { value } = e.target;

    switch ( control ) {
      case 'branch':
        dispatch( { type: 'set-branch', payload: value } );
        break;
      case 'owner':
        dispatch( { type: 'set-owner', payload: value } );
        break;
      case 'repo':
        dispatch( { type: 'set-repo', payload: value } );
        break;
      case 'subdir':
        dispatch( { type: 'set-subdir', payload: value } );
        break;
      default:
    }
  };

  const getBranch = async () => {
    const { branches: allBranches, defaultBranch } = await getBranches(
      { owner, repo },
      token,
    );

    dispatch( { type: 'set-branches', payload: allBranches } );
    dispatch( { type: 'set-branch', payload: defaultBranch } );
    dispatch( { type: 'increment-active' } );
  };

  const confirmChoice = action => {
    dispatch( { type: `confirm-${action}` } );
    dispatch( { type: 'increment-active' } );
  };

  const getTree = async () => {
    const repoTree = await getRepoDocs(
      { owner, repo },
      token,
      branch,
      subdirectory,
    );

    setTree( repoTree );
    dispatch( { type: 'increment-active' } );
  };

  const reset = () => {
    dispatch( { type: 'reset' } );
    setTree( null );
  };

  return (
    <div className="gpalab-docs-wizard-container">
      <ProgressBar steps={ steps } />
      <div className="gpalab-docs-wizard-contents">
        <div className="gpalab-docs-wizard-section">
          <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-owner">
            { `${__( 'Identify repo owner', 'gpalab-guillotine' )}:` }
            <input
              disabled={ !!branch }
              id="gpalab-docs-owner"
              type="text"
              value={ owner }
              onChange={ e => handleInput( e, 'owner' ) }
            />
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
              onClick={ () => confirmChoice( 'branch' ) }
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
              onClick={ () => confirmChoice( 'subdir' ) }
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
    </div>
  );
};

export default RepoWizard;
