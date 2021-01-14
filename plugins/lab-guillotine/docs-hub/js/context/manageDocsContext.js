import { createContext } from '@wordpress/element';

const { connectedRepos } = window?.gpalabDocsHub || {};

export const ManageDocsContext = createContext();

export const initialState = {
  repos: connectedRepos,
};

export const manageDocsReducer = ( state, action ) => {};
