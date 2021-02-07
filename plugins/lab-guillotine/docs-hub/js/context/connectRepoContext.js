import { createContext } from '@wordpress/element';
import { actions, assign, createMachine, interpret } from 'xstate';

import { removeFile } from 'docs-hub/utils/filters';
import { convertPathToTitle } from 'docs-hub/utils/normalizers';
import { getBranches, getManyFiles, getRepoDocs } from 'docs-hub/utils/api';

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
  visible: {
    getBranchesButton: false,
    setBranchSection: false,
    setSubdirSection: false,
    tree: false,
  },
};

const setButton = step => {
  switch ( step ) {
    case 'one':
      return 'branches';
    default:
      return null;
  }
};

const handleDeactivation = ctx => {
  switch ( ctx.step ) {
    case 'one':
      return [
        ...ctx.disabled, 'ownerField', 'repoField', 'getBranchesButton',
      ];
    case 'two':
      return [
        ...ctx.disabled, 'branchesField', 'setBranchButton',
      ];
    case 'three':
      return [
        ...ctx.disabled, 'subdirField', 'subdirButton',
      ];
    default:
      return ctx.disabled;
  }
};

const getTree = async repos => {
  const currentRepos = repos ? repos.map( item => item.parent ) : [];
  const parent = createParentString( owner, repo, subdir, branch );

  // if ( !currentRepos.includes( parent ) ) {
  //   const repoTree = await getRepoDocs(
  //     { owner, repo },
  //     token,
  //     branch,
  //     subdir,
  //   );

  //   dispatch( { type: 'leaves-init', payload: flattenTree( repoTree ) } );
  //   setTree( repoTree );
  //   dispatch( { type: 'increment-active' } );
  // } else {
  //   send( {
  //     type: 'ERROR',
  //     error: {
  //       message: i18nize( 'This repository has already been connected' ),
  //       type: i18nize( 'Duplicate Repo' ),
  //     },
  //   } );
  // }
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
            SUBMIT: {
              actions: 'setTitle',
              target: 'stepFour',
            },
          },
        },
        stepFour: {
          on: {
            ERROR: {
              target: '#error.duplicate',
              actions: assign( ( _, evt ) => ( { error: evt.error } ) ),
            },
          },
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
        duplicate: {},
      },
    },
    pending: {
      id: 'pending',
      states: {
        branches: {
          invoke: {
            id: 'fetchBranches',
            src: ctx => getBranches(
              { owner: ctx.owner, repo: ctx.repo },
              ctx.token,
            ),
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
                actions: assign( { error: ( _, evt ) => evt.data.error } ),
              },
            ],
            onError: {
              target: '#error.branches',
              actions: assign( { error: ( _, evt ) => evt.data.error } ),
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
    handleInput: assign( ( cxt, evt ) => ( {
      [evt.name]: evt.value,
    } ) ),
    toggleGetBranchesButton: actions.pure( ctx => {
      const fullRepo = ctx.owner && ctx.repo;
      const visibility = ctx.visible.getBranchesButton;

      if ( fullRepo && !visibility ) {
        return assign( setVisible( ctx, 'getBranchesButton', true ) );
      } if ( !fullRepo && visibility ) {
        return assign( setVisible( ctx, 'getBranchesButton', false ) );
      }
    } ),
    setTitle: assign( ctx => ( {
      title: ctx.subdir ? convertPathToTitle( ctx.subdir ) : convertPathToTitle( ctx.repo ),
    } ) ),
    showSetBranchSection: assign( ctx => setVisible( ctx, 'setBranchSection', true ) ),
    showSetSubdirSectionSection: assign( ctx => setVisible( ctx, 'setSubdirSection', true ) ),
    reset: assign( initialState ),
  },
  guards: {
    hasBranch: ctx => !!ctx.branch,
    hasNoError: ( _, evt ) => !evt.data.error,
  },
} );

export const ConnectRepoContext = createContext();

export const connectRepoReducer = ( state, action ) => {
  const { payload } = action;

  switch ( action.type ) {
    case 'error-add':
      return {
        ...state,
        error: payload,
      };
    case 'increment-active':
      return {
        ...state,
        active: state.active + 1,
      };
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
    case 'leaves-init':
      return {
        ...state,
        selectedFiles: payload,
      };
    default:
      return state;
  }
};
