import { createContext } from '@wordpress/element';
import { actions, assign, createMachine, forwardTo, interpret, pure, send } from 'xstate';

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
  subdirectory: '',
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

const setVisible = ( ctx, item, val ) => ( { visible: { ...ctx.visible, [item]: val } } );

export const repoWizardMachine2 = createMachine( {
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
        },
        stepThree: {},
        stepFour: {},
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
    showSetBranchSection: assign( ctx => setVisible( ctx, 'setBranchSection', true ) ),
    reset: assign( initialState ),
  },
  guards: {
    hasNoError: ( _, evt ) => !evt.data.error,
  },
} );

export const repoWizardMachine = createMachine(
  {
    initial: 'awaitingInput',
    context: initialState,
    states: {
      awaitingInput: {
        initial: 'one',
        states: {
          one: {
            exit: ['deactivateInputs'],
            on: {
              NEXT: {
                actions: assign( { step: 'two' } ),
                target: 'two',
              },
            },
          },
          two: {
            exit: ['deactivateInputs'],
            on: {
              NEXT: {
                actions: assign( { step: 'three' } ),
                target: 'three',
              },
            },
          },
          three: {
            exit: ['deactivateInputs'],
            on: {
              NEXT: {
                actions: assign( { step: 'four' } ),
                target: 'four',
              },
            },
          },
          four: {
            on: {
              NEXT: {
                actions: assign( { step: 'five' } ),
                target: 'five',
              },
            },
          },
          five: {
            type: 'final',
          },
        },
      },
      error: {},
      pending: {},
    },
    on: {
      INPUT: {
        actions: 'handleInput',
      },
      RESET: {
        actions: 'reset',
        target: 'awaitingInput',
      },
    },
  },
  {
    actions: {
      deactivateInputs: assign( ctx => ( {
        disabled: handleDeactivation( ctx ),
      } ) ),
      handleInput: assign( ( cxt, evt ) => ( {
        [evt.name]: evt.value,
        showButton: setButton( cxt.step ),
      } ) ),
      reset: assign( initialState ),
    },
    guards: {
      hasRepo: ctx => ctx.owner && ctx.repo,
    },
  },
);

export const repoWizardService = interpret( repoWizardMachine, { devTools: true } );

export const ConnectRepoContext = createContext();

export const connectRepoReducer = ( state, action ) => {
  const { payload } = action;

  switch ( action.type ) {
    case 'confirm-branch':
      return {
        ...state,
        branchSet: true,
      };
    case 'confirm-subdir':
      return {
        ...state,
        subdirSet: true,
        title: state.subdirectory
          ? convertPathToTitle( state.subdirectory )
          : convertPathToTitle( state.repo ),
      };
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
    case 'set-branch':
      return {
        ...state,
        branch: payload,
      };
    case 'set-branches':
      return {
        ...state,
        branches: payload,
      };
    default:
      return state;
  }
};
