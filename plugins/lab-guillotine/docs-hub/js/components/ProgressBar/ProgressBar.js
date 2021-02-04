import propTypes from 'prop-types';

import Step from './Step';

import './ProgressBar.css';

const ProgressBar = ( { active, steps } ) => (
  <ul
    className="gpalab-docs-progress-bar"
    style={ { gridTemplateColumns: `repeat(${steps.length}, 1fr)` } }
  >
    { steps.map( step => (
      <li key={ step.title }>
        <Step active={ active === step.id } title={ step.title } subtitle={ step.subtitle } />
      </li>
    ) ) }
  </ul>
);

ProgressBar.propTypes = {
  active: propTypes.string,
  steps: propTypes.arrayOf(
    propTypes.shape( {
      id: propTypes.string,
      subtitle: propTypes.string,
      title: propTypes.string,
    } ),
  ),
};

export default ProgressBar;
