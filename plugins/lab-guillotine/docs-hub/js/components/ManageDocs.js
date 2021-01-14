import { useReducer } from '@wordpress/element';

import ConnectRepo from './ConnectRepo/ConnectRepo';
import ConnectedRepos from './ConnectedRepos/ConnectedRepos';

import { ManageDocsContext, manageDocsReducer, initialState } from 'docs-hub/context/manageDocsContext';

const ManageDocs = () => {
  const [state, dispatch] = useReducer( manageDocsReducer, initialState );

  const store = {
    dispatch,
    state,
  };

  return (
    <ManageDocsContext.Provider value={ store }>
      <ConnectRepo />
      <ConnectedRepos />
    </ManageDocsContext.Provider>
  );
};

export default ManageDocs;
