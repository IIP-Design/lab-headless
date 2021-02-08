import { createContext } from '@wordpress/element';

import { removeFile } from 'docs-hub/utils/filters';

const { githubDefaultOrg, githubToken } = window.gpalabDocsHub;

export const initialState = {
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
