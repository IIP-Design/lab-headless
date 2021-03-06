import { actions, assign, createMachine } from 'xstate';

import { convertPathToTitle, createParentString, flattenTree } from 'docs-hub/utils/normalizers';
import { getBranches, getRepoDocs } from 'docs-hub/utils/api';
import { i18nize } from 'shared/utils/helpers';

const { githubDefaultOrg, githubToken } = window.gpalabDocsHub;

const initialContext = {
  branch: '',
  branches: null,
  branchSet: false,
  disabled: {
    ownerField: false,
    repoField: false,
    subdirField: false,
    getBranchesButton: false,
    branchesField: false,
    setBranchButton: false,
  },
  error: null,
  owner: githubDefaultOrg,
  repo: '',
  selectedFiles: [],
  ignoredFiles: [],
  subdir: '',
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

/* HELPERS */

const dupRepoError = {
  message: i18nize( 'This repository has already been connected' ),
  type: i18nize( 'Duplicate Repo' ),
};

/**
 * Compare selected repo against the list of already connected repos.
 *
 * @param {Object} ctx An XState context object.
 * @param {Object[]} repos A list of repository data provided to the XState event.
 * @returns {boolean} Whether or not the current repo has already been connected.
 *
 * @see createParentString
 */
const isDupRepo = ( ctx, repos ) => {
  const { owner, repo, subdir, branch } = ctx;
  const parent = createParentString( owner, repo, subdir, branch );

  const currentRepos = repos ? repos.map( item => item.parent ) : [];

  return currentRepos.includes( parent );
};

/**
 * Generates a repo title depending on the provided values.
 *
 * @param {string} subdir The (optional) name of the sub-directory to search.
 * @param {string} repo The name of the GitHub repository.
 * @returns {string} The generated project title.
 */
const constructTitle = ( subdir, repo ) => ( {
  title: subdir ? convertPathToTitle( subdir ) : convertPathToTitle( repo ),
} );

/**
 * Sets the value of the provided element to true/false in the visible array.
 *
 * @param {string} el The name of the element to hide/show.
 * @param {boolean} val Whether to make visible (true) or hide (false)
 * @returns {assign} An XState assign function to update the context accordingly.
 */
const setVisibility = ( el, val ) => assign( ctx => ( { visible: { ...ctx.visible, [el]: val } } ) );

/**
 * Implements the setVisibility function to make a given element hidden.
 *
 * @param {string} el The element name to be hidden.
 * @returns {setVisibility} A function to hide the provided element.
 *
 * @see setVisibility
 */
const hide = el => setVisibility( el, false );

/**
 * Implements the setVisibility function to make a given element visible.
 *
 * @param {string} el The element name to be shown.
 * @returns {setVisibility} A function to show the provided element.
 *
 * @see setVisibility
 */
const show = el => setVisibility( el, true );

/**
 * Manages the visibility of the get branches button depending on the in
 * @param {string} owner The value of the owner field.
 * @param {string} repo The value of the repo name field.
 * @param {Object} visible List of all elements whose visibility can be toggled and their current visibility.
 * @returns {hide|show} The function to hide/show the get branches button.
 */
const manageBranchesBtn = ( owner, repo, visible ) => {
  const fullRepo = owner && repo;
  const visibility = visible.getBranchesButton;

  if ( fullRepo && !visibility ) {
    return show( 'getBranchesButton' );
  } if ( !fullRepo && visibility ) {
    return hide( 'getBranchesButton', false );
  }
};

/**
 * Sets the value of the provided element to true/false in the disabled array.
 *
 * @param {string[]} els List of elements add to/remove from the disabled list.
 * @param {boolean} val Whether to make visible (true) or hide (false).
 * @returns {assign} An XState assign function to update the context accordingly.
 */
const setDisabled = ( els, val ) => assign( ctx => {
  const fields = {};

  els.forEach( el => {
    fields[el] = val;
  } );

  return ( { disabled: { ...ctx.disabled, ...fields } } );
} );

/**
 * Implements the setDisabled function to disable a given list of elements.
 *
 * @param {string[]} els A list of element names to be disabled.
 * @returns {setDisabled} A function to disable the provided elements.
 *
 * @see setDisabled
 */
const disable = els => setDisabled( els, true );

/**
 * Implements the setDisabled function to enable a given list of elements.
 *
 * @param {string[]} els A list of element names to be enabled.
 * @returns {setDisabled} A function to enable the provided elements.
 *
 * @see setDisabled
 */
const enable = els => setDisabled( els, false );

/* State Machine */
export const repoWizardMachine = createMachine( {
  id: 'repoWizard',
  initial: 'awaitingInput',
  context: initialContext,
  states: {
    awaitingInput: {
      id: 'awaitingInput',
      initial: 'stepOne',
      states: {
        stepOne: {
          on: {
            INPUT: {
              actions: ['handleInput', 'toggleBranchesBtn'],
            },
            FETCH_BRANCHES: '#pending.branches',
          },
        },
        stepTwo: {
          entry: [
            show( 'setBranchSection' ),
            disable( [
              'getBranchesButton', 'ownerField', 'repoField', 'subdirField',
            ] ),
          ],
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
          entry: [
            show( 'getTreeButton' ),
            disable( ['branchesField', 'setBranchButton'] ),
          ],
          on: {
            INPUT: {
              actions: 'handleInput',
            },
            FETCH_TREE: [
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
          entry: [hide( 'getTreeButton' ), show( 'tree' )],
          on: {
            INPUT: {
              actions: 'handleInput',
            },
          },
        },
      },
    },
    error: {
      id: 'error',
      states: {
        branches: {
          entry: hide( 'getBranchesButton' ),
          exit: 'clearError',
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
    handleInput: assign( ( _, { name, value } ) => ( { [name]: value } ) ),
    clearError: assign( { error: null } ),
    genericError: assign( { error: ( _, evt ) => evt.data.error } ),
    toggleBranchesBtn: actions.pure( ( { owner, repo, visible } ) => manageBranchesBtn( owner, repo, visible ) ),
    setTitle: assign( ( { subdir, repo } ) => constructTitle( subdir, repo ) ),
    reset: assign( initialContext ),
  },
  guards: {
    hasBranch: ctx => !!ctx.branch,
    hasNoError: ( _, evt ) => !evt.data.error,
    noDupRepo: ( ctx, { repos } ) => !isDupRepo( ctx, repos ),
  },
} );
