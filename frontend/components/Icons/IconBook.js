import propTypes from 'prop-types';

const IconBook = ( { fill = 'none', size = '24', stroke = 'currentColor' } ) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={ size } height={ size } viewBox="0 0 24 24" fill={ fill } stroke={ stroke } strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-book-open">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

IconBook.propTypes = {
  fill: propTypes.string,
  size: propTypes.string,
  stroke: propTypes.string,
};

export default IconBook;
