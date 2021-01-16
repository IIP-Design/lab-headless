import { useContext, useState } from '@wordpress/element';

import ErrorMsg from '../ErrorMsg/ErrorMsg';
import PageSection from '../PageSection/PageSection';
import ProgressBar from '../ProgressBar/ProgressBar';
import Tree from '../Tree/Tree';

import { ConnectRepoContext } from 'docs-hub/context/connectRepoContext';
import { ManageDocsContext } from 'docs-hub/context/manageDocsContext';
import { createPageList, createParentString, flattenTree } from 'docs-hub/utils/normalizers';
import { getBranches, getManyFiles, getRepoDocs } from 'docs-hub/utils/api';
import { hasFiles } from 'docs-hub/utils/helpers';
import { saveRepoData } from 'docs-hub/utils/admin-ajax';
import { i18nize } from 'shared/utils/helpers';
import { steps } from './progress-steps';

import './RepoWizard.css';

const RepoWizard = () => {
  const [tree, setTree] = useState( null );

  const {
    dispatch,
    state: {
      branch,
      branches,
      branchSet,
      error,
      ignoredFiles,
      owner,
      repo,
      selectedFiles,
      subdirectory,
      subdirSet,
      title,
      token,
    },
  } = useContext( ConnectRepoContext );

  const { dispatch: reposDispatch, state: { repos } } = useContext( ManageDocsContext );

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
      case 'title':
        dispatch( { type: 'set-title', payload: value } );
        break;
      default:
    }
  };

  const getBranch = async () => {
    const { branches: allBranches, defaultBranch, error } = await getBranches(
      { owner, repo },
      token,
    );

    if ( error ) {
      dispatch( { type: 'error-add', payload: error } );
    } else {
      dispatch( { type: 'set-branches', payload: allBranches } );
      dispatch( { type: 'set-branch', payload: defaultBranch } );
      dispatch( { type: 'increment-active' } );
    }
  };

  const confirmChoice = action => {
    dispatch( { type: `confirm-${action}` } );
    dispatch( { type: 'increment-active' } );
  };

  const getTree = async () => {
    const currentRepos = repos ? repos.map( item => item.parent ) : [];
    const parent = createParentString( owner, repo, subdirectory, branch );

    if ( !currentRepos.includes( parent ) ) {
      const repoTree = await getRepoDocs(
        { owner, repo },
        token,
        branch,
        subdirectory,
      );

      dispatch( { type: 'leaves-init', payload: flattenTree( repoTree ) } );
      setTree( repoTree );
      dispatch( { type: 'increment-active' } );
    } else {
      dispatch( { type: 'error-add', payload: { message: i18nize( 'This repository has already been connected' ) } } );
    }
  };

  const reset = () => {
    dispatch( { type: 'reset' } );
    setTree( null );
  };

  const onSuccess = response => {
    const repoData = response?.data?.repo;

    if ( repoData ) {
      reposDispatch( { type: 'add-repo', payload: repoData } );
      reset();
    }
  };

  const saveRepo = async () => {
    const withContent = await getManyFiles( selectedFiles, { owner, repo }, branch, token );

    const repoData = {
      files: createPageList( withContent, ignoredFiles ),
      repository: {
        branch,
        owner,
        repo,
        subdirectory,
        title,
      },
    };

    saveRepoData( repoData, onSuccess );
  };

  return (
    <PageSection title="Connect a New Repository">
      <ProgressBar steps={ steps } />
      <div className="gpalab-docs-wizard-contents">
        <div className="gpalab-docs-wizard-section">
          <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-owner">
            { `${i18nize( 'Identify repo owner' )}:` }
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
            { `${i18nize( 'Add the repo name' )}:` }
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
              { i18nize( 'Get GitHub Branches' ) }
            </button>
          ) }
        </div>
        { branches && (
          <div className="gpalab-docs-wizard-section">
            <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-default-branch">
              { `${i18nize( 'Choose the branch' )}:` }
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
              { i18nize( 'Use This Branch' ) }
            </button>
          </div>
        ) }
        { branchSet && (
          <div className="gpalab-docs-wizard-section">
            <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-subdir">
              { `${i18nize( 'Search sub-directory' )}:` }
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
              { subdirectory ? i18nize( 'Search This Directory' ) : i18nize( 'No, Search Root' ) }
            </button>
          </div>
        ) }
        { tree && (
          <div className="gpalab-docs-tree-container">
            <label
              className="gpalab-docs-wizard-label"
              htmlFor="gpalab-docs-title"
              style={ { margin: '0.5rem 0 1rem' } }
            >
              { `${i18nize( 'Repo name' )}:` }
              <input
                id="gpalab-docs-title"
                type="text"
                value={ title }
                onChange={ e => handleInput( e, 'title' ) }
              />
            </label>
            <strong>{ `${i18nize( 'Results' )}:` }</strong>
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
            { i18nize( 'Reset Form' ) }
          </button>

          <button
            className="gpalab-docs-wizard-button"
            style={ { display: subdirSet && !tree ? 'block' : 'none', padding: '0.3rem 0' } }
            type="button"
            onClick={ () => getTree() }
          >
            { i18nize( 'Get Repo File Tree' ) }
          </button>

          <button
            className="gpalab-docs-wizard-button"
            style={ { display: tree && hasFiles( tree ) ? 'block' : 'none', padding: '0.3rem 0' } }
            type="button"
            onClick={ () => saveRepo() }
          >
            { i18nize( 'Save Selected Docs Pages' ) }
          </button>
        </div>
        { error && (
          <ErrorMsg error={ error } />
        ) }
      </div>
    </PageSection>
  );
};

export default RepoWizard;
