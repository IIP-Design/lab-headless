import { createContext } from '@wordpress/element';

const { connectedRepos } = window?.gpalabDocsHub || {};

export const ManageDocsContext = createContext();

export const initialState = {
  repos: connectedRepos,
};

export const manageDocsReducer = ( state, action ) => {
  const { payload } = action;

  switch ( action.type ) {
    case 'add-repo':
      return {
        ...state,
        repos: [...state.repos, payload],
      };
    default:
      return state;
  }
};
