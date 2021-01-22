import propTypes from 'prop-types';

const IconCode = ( { fill = 'none', size = '24', stroke = 'currentColor' } ) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={ size } height={ size } viewBox="0 0 24 24" fill={ fill } stroke={ stroke } strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-code">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

IconCode.propTypes = {
  fill: propTypes.string,
  size: propTypes.string,
  stroke: propTypes.string,
};

export default IconCode;
