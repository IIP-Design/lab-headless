import propTypes from 'prop-types';
import { useContext } from '@wordpress/element';

import { ConnectRepoContext } from 'docs-hub/context/connectRepoContext';

import Step from './Step';

import './ProgressBar.css';

const ProgressBar = ( { steps } ) => {
  const { state: { active } } = useContext( ConnectRepoContext );

  return (
    <ul
      className="gpalab-docs-progress-bar"
      style={ { gridTemplateColumns: `repeat(${steps.length}, 1fr)` } }
    >
      { steps.map( ( step, idx ) => (
        <li key={ step.title }>
          <Step active={ active === idx } title={ step.title } subtitle={ step.subtitle } />
        </li>
      ) ) }
    </ul>
  );
};

ProgressBar.propTypes = {
  steps: propTypes.arrayOf(
    propTypes.shape( {
      subtitle: propTypes.string,
      title: propTypes.string,
    } ),
  ),
};

export default ProgressBar;
