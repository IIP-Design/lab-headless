import propTypes from 'prop-types';

import './ProgressBar.css';

const Step = ( { active, subtitle, title } ) => (
  <div className={ active ? 'gpalab-docs-progress-step active' : 'gpalab-docs-progress-step' }>
    <span>{ title }</span>
    <span>{ subtitle }</span>
  </div>
);

Step.propTypes = {
  active: propTypes.bool,
  subtitle: propTypes.string,
  title: propTypes.string,
};

export default Step;
