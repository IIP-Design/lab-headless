import { createContext } from '@wordpress/element';
import { assign, createMachine, interpret } from 'xstate';

import { removeFile } from 'docs-hub/utils/filters';
import { convertPathToTitle } from 'docs-hub/utils/normalizers';

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

export const repoWizardMachine = createMachine( {
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
              cond: 'hasRepo',
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
}, {
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
} );

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
        title: state.subdirectory ? convertPathToTitle( state.subdirectory ) : convertPathToTitle( state.repo ),
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
