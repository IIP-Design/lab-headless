import propTypes from 'prop-types';

const IconClock = ( { fill = 'none', size = '24', stroke = 'currentColor' } ) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={ size } height={ size } viewBox="0 0 24 24" fill={ fill } stroke={ stroke } strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

IconClock.propTypes = {
  fill: propTypes.string,
  size: propTypes.string,
  stroke: propTypes.string,
};

export default IconClock;
