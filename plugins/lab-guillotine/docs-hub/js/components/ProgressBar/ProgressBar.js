import propTypes from 'prop-types';

import './ProgressBar.css';

import Step from './Step';

const ProgressBar = ( { active, steps } ) => (
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

ProgressBar.propTypes = {
  active: propTypes.number,
  steps: propTypes.arrayOf(
    propTypes.shape( {
      subtitle: propTypes.string,
      title: propTypes.string,
    } ),
  ),
};

export default ProgressBar;
