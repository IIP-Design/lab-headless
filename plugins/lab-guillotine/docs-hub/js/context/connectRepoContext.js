import { createContext } from '@wordpress/element';

import { removeFile } from '../utils/filters';

const { githubDefaultOrg, githubToken } = window.gpalabDocsHub;

export const initialState = {
  active: 0,
  branch: '',
  branches: null,
  branchSet: false,
  owner: githubDefaultOrg,
  repo: '',
  selectedFiles: [],
  ignoredFiles: [],
  subdirectory: '',
  subdirSet: false,
  token: githubToken,
};


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
    case 'set-owner':
      return {
        ...state,
        owner: payload,
      };
    case 'set-repo':
      return {
        ...state,
        repo: payload,
      };
    case 'set-subdir':
      return {
        ...state,
        subdirectory: payload,
      };
    case 'reset':
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
