import { useReducer } from '@wordpress/element';

import RepoWizard from './RepoWizard/RepoWizard';

import { ConnectRepoContext, connectRepoReducer, initialState } from '../context/connectRepoContext';

const ConnectRepo = () => {
  const [state, dispatch] = useReducer( connectRepoReducer, initialState );

  const store = {
    dispatch,
    state,
  };

  return (
    <ConnectRepoContext.Provider value={ store }>
      <RepoWizard />
    </ConnectRepoContext.Provider>
  );
};

export default ConnectRepo;
