import { createContext } from '@wordpress/element';
import { actions, assign, createMachine } from 'xstate';

import { removeFile } from 'docs-hub/utils/filters';
import { convertPathToTitle, createPageList, createParentString, flattenTree } from 'docs-hub/utils/normalizers';
import { getBranches, getManyFiles, getRepoDocs } from 'docs-hub/utils/api';
import { i18nize } from 'shared/utils/helpers';

const { githubDefaultOrg, githubToken } = window.gpalabDocsHub;

export const initialState = {
  branch: '',
  branches: null,
  branchSet: false,
  disabled: [],
  error: null,
  owner: githubDefaultOrg,
  repo: '',
  selectedFiles: [],
  ignoredFiles: [],
  showButton: null,
  subdir: '',
  subdirSet: false,
  step: 'one',
  title: '',
  token: githubToken,
  tree: {},
  visible: {
    getBranchesButton: false,
    getTreeButton: false,
    setBranchSection: false,
    tree: false,
  },
};

const dupRepoError = {
  message: i18nize( 'This repository has already been connected' ),
  type: i18nize( 'Duplicate Repo' ),
};

const isDupRepo = ( ctx, evt ) => {
  const { owner, repo, subdir, branch } = ctx;
  const parent = createParentString( owner, repo, subdir, branch );

  const currentRepos = evt.repos ? evt.repos.map( item => item.parent ) : [];

  return currentRepos.includes( parent );
};

const setVisible = ( ctx, item, val ) => ( { visible: { ...ctx.visible, [item]: val } } );

export const repoWizardMachine = createMachine( {
  id: 'repoWizard',
  initial: 'awaitingInput',
  context: initialState,
  states: {
    awaitingInput: {
      id: 'awaitingInput',
      initial: 'stepOne',
      states: {
        stepOne: {
          on: {
            INPUT: {
              actions: ['handleInput', 'toggleGetBranchesButton'],
            },
            FETCH: '#pending.branches',
          },
        },
        stepTwo: {
          entry: 'showSetBranchSection',
          exit: assign( { step: 'three' } ),
          on: {
            INPUT: {
              actions: 'handleInput',
            },
            SUBMIT: {
              cond: 'hasBranch',
              target: 'stepThree',
            },
          },
        },
        stepThree: {
          entry: 'showSetSubdirSectionSection',
          exit: assign( { step: 'four' } ),
          on: {
            INPUT: {
              actions: 'handleInput',
            },
            FETCH: [
              {
                actions: 'setTitle',
                cond: 'noDupRepo',
                target: '#pending.tree',
              },
              { target: '#error.duplicate' },
            ],
          },
        },
        stepFour: {
          entry: show( 'tree' ),
        },
        stepFive: {},
      },
    },
    error: {
      id: 'error',
      states: {
        branches: {
          entry: assign( ctx => setVisible( ctx, 'getBranchesButton', false ) ),
          exit: assign( { error: null } ),
          on: {
            INPUT: {
              target: '#awaitingInput.stepOne',
              actions: 'handleInput',
            },
          },
        },
        duplicate: {
          entry: assign( () => ( { error: dupRepoError } ) ),
          exit: 'clearError',
          on: {
            INPUT: {
              target: '#awaitingInput.stepThree',
              actions: 'handleInput',
            },
          },
        },
        tree: {
          exit: 'clearError',
          on: {
            INPUT: {
              target: '#awaitingInput.stepThree',
              actions: 'handleInput',
            },
          },
        },
      },
    },
    pending: {
      id: 'pending',
      states: {
        branches: {
          invoke: {
            id: 'fetchBranches',
            src: ( { owner, repo, token } ) => getBranches( { owner, repo }, token ),
            onDone: [
              {
                cond: 'hasNoError',
                target: '#awaitingInput.stepTwo',
                actions: assign( {
                  branch: ( _, evt ) => evt.data.defaultBranch,
                  branches: ( _, evt ) => evt.data.branches,
                  step: 'two',
                } ),
              },
              {
                target: '#error.branches',
                actions: 'genericError',
              },
            ],
            onError: {
              target: '#error.branches',
              actions: 'genericError',
            },
          },
        },
        tree: {
          entry: assign( { step: 'four' } ),
          invoke: {
            id: 'fetchTree',
            src: ( { branch, owner, repo, subdir, token } ) => getRepoDocs( { owner, repo }, token, branch, subdir ),
            onDone: [
              {
                cond: 'hasNoError',
                target: '#awaitingInput.stepFour',
                actions: assign( {
                  selectedFiles: ( _, evt ) => flattenTree( evt.data ),
                  tree: ( _, evt ) => evt.data,
                } ),
              },
              {
                target: '#error.tree',
                actions: 'genericError',
              },
            ],
            onError: {
              target: '#error.tree',
              actions: 'genericError',
            },
          },
        },
      },
    },
  },
  on: {
    RESET: {
      actions: 'reset',
      target: 'awaitingInput',
    },
  },
}, {
  actions: {
    handleInput: assign( ( _, evt ) => ( {
      [evt.name]: evt.value,
    } ) ),
    clearError: assign( { error: null } ),
    genericError: assign( { error: ( _, evt ) => evt.data.error } ),
    toggleGetBranchesButton: actions.pure( ctx => {
      const fullRepo = ctx.owner && ctx.repo;
      const visibility = ctx.visible.getBranchesButton;

      if ( fullRepo && !visibility ) {
        return show( 'getBranchesButton' );
      } if ( !fullRepo && visibility ) {
        return hide( 'getBranchesButton', false );
      }
    } ),
    setTitle: assign( ctx => ( {
      title: ctx.subdir ? convertPathToTitle( ctx.subdir ) : convertPathToTitle( ctx.repo ),
    } ) ),
    reset: assign( initialState ),
  },
  guards: {
    hasBranch: ctx => !!ctx.branch,
    hasNoError: ( _, evt ) => !evt.data.error,
    noDupRepo: ( ctx, evt ) => !isDupRepo( ctx, evt ),
  },
} );

export const ConnectRepoContext = createContext();

export const connectRepoReducer = ( state, action ) => {
  const { payload } = action;

  switch ( action.type ) {
    case 'leaf-add':
      return {
        ...state,
        ignoredFiles: removeFile( payload, state.ignoredFiles ),
        selectedFiles: [...state.selectedFiles, payload],
      };
    case 'leaf-remove':
      return {
        ...state,
        ignoredFiles: [...state.ignoredFiles, payload],
        selectedFiles: removeFile( payload, state.selectedFiles ),
      };
    default:
      return state;
  }
};
