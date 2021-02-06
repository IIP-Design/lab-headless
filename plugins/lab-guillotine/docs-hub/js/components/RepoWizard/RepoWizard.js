import { useContext, useState } from '@wordpress/element';
import { useMachine } from '@xstate/react';

import ErrorMsg from '../ErrorMsg/ErrorMsg';
import PageSection from '../PageSection/PageSection';
import ProgressBar from '../ProgressBar/ProgressBar';
import Tree from '../Tree/Tree';

import { ConnectRepoContext, repoWizardService, repoWizardMachine2 } from 'docs-hub/context/connectRepoContext';
import { ManageDocsContext } from 'docs-hub/context/manageDocsContext';
import { createPageList, createParentString, flattenTree } from 'docs-hub/utils/normalizers';
import { getManyFiles, getRepoDocs } from 'docs-hub/utils/api';
import { hasFiles } from 'docs-hub/utils/helpers';
import { saveRepoData } from 'docs-hub/utils/admin-ajax';
import { i18nize } from 'shared/utils/helpers';
import { steps } from './progress-steps';

import './RepoWizard.css';

const RepoWizard = () => {
  const [tree, setTree] = useState( null );

  const [{ context, value: xstate }, send] = useMachine( repoWizardMachine2, { devTools: true } );

  console.log( context, xstate );

  const {
    dispatch,
    state: {
      branchSet,
      ignoredFiles,
      selectedFiles,
      subdirSet,
      token,
    },
  } = useContext( ConnectRepoContext );

  const { branch, branches, disabled, error, owner, repo, subdir, step, title, visible } = context;

  const { dispatch: reposDispatch, state: { repos } } = useContext( ManageDocsContext );

  const handleInput = e => {
    const { value, name } = e.target;

    send( { type: 'INPUT', name, value } );
  };

  const confirmChoice = action => {
    dispatch( { type: `confirm-${action}` } );
    dispatch( { type: 'increment-active' } );
    repoWizardService.send( { type: 'NEXT' } );
  };

  const getTree = async () => {
    const currentRepos = repos ? repos.map( item => item.parent ) : [];
    const parent = createParentString( owner, repo, subdir, branch );

    if ( !currentRepos.includes( parent ) ) {
      const repoTree = await getRepoDocs(
        { owner, repo },
        token,
        branch,
        subdir,
      );

      dispatch( { type: 'leaves-init', payload: flattenTree( repoTree ) } );
      setTree( repoTree );
      dispatch( { type: 'increment-active' } );
      repoWizardService.send( { type: 'NEXT' } );
    } else {
      dispatch( { type: 'error-add', payload: { message: i18nize( 'This repository has already been connected' ) } } );
    }
  };

  const reset = () => {
    send( { type: 'RESET' } );
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
        subdirectory: subdir,
        title,
      },
    };

    saveRepoData( repoData, onSuccess );
  };

  const isDisabled = name => ( disabled ? disabled.includes( name ) : false );

  return (
    <PageSection title="Connect a New Repository">
      <ProgressBar active={ step } steps={ steps } />
      <div className="gpalab-docs-wizard-contents">
        <div className="gpalab-docs-wizard-section">
          <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-owner">
            { `${i18nize( 'Identify repo owner' )}:` }
            <input
              disabled={ isDisabled( 'ownerField' ) }
              id="gpalab-docs-owner"
              name="owner"
              type="text"
              value={ owner }
              onChange={ e => handleInput( e ) }
            />
          </label>
        </div>
        <div className="gpalab-docs-wizard-section">
          <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-repo">
            { `${i18nize( 'Add the repo name' )}:` }
            <input
              disabled={ isDisabled( 'repoField' ) }
              id="gpalab-docs-repo"
              name="repo"
              type="text"
              value={ repo }
              onChange={ e => handleInput( e ) }
            />
          </label>
          { visible?.getBranchesButton && (
            <button
              className="gpalab-docs-wizard-button"
              type="button"
              disabled={ isDisabled( 'getBranchesButton' ) }
              onClick={ () => send( { type: 'FETCH' } ) }
            >
              { i18nize( 'Get GitHub Branches' ) }
            </button>
          ) }
        </div>
        { visible?.setBranchSection && (
          <div className="gpalab-docs-wizard-section">
            <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-default-branch">
              { `${i18nize( 'Choose the branch' )}:` }
              <select
                disabled={ isDisabled( 'branchesField' ) }
                id="gpalab-docs-default-branch"
                name="branch"
                value={ branch }
                onBlur={ e => handleInput( e ) }
                onChange={ e => handleInput( e ) }
              >
                { branches.map( branchRef => (
                  <option key={ branchRef } value={ branchRef }>{ branchRef }</option>
                ) ) }
              </select>
            </label>
            <button
              className="gpalab-docs-wizard-button"
              disabled={ isDisabled( 'setBranchButton' ) }
              type="button"
              onClick={ () => confirmChoice( 'branch' ) }
            >
              { i18nize( 'Use This Branch' ) }
            </button>
          </div>
        ) }
        { visible?.setSubdirSection && (
          <div className="gpalab-docs-wizard-section">
            <label className="gpalab-docs-wizard-label" htmlFor="gpalab-docs-subdir">
              { `${i18nize( 'Search sub-directory' )}:` }
              <input
                disabled={ isDisabled( 'subdirField' ) }
                id="gpalab-docs-subdir"
                name="subdir"
                type="text"
                value={ subdir }
                onChange={ e => handleInput( e ) }
              />
            </label>
            <button
              className="gpalab-docs-wizard-button"
              disabled={ isDisabled( 'subdirButton' ) }
              type="button"
              onClick={ () => confirmChoice( 'subdir' ) }
            >
              { subdir ? i18nize( 'Search This Directory' ) : i18nize( 'No, Search Root' ) }
            </button>
          </div>
        ) }
        { visible?.tree && (
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
                name="title"
                value={ title }
                onChange={ e => handleInput( e ) }
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
