import propTypes from 'prop-types';

import style from './Container.module.scss';

const Container = ( { children } ) => <div className={ style.container }>{ children }</div>;

Container.propTypes = {
  children: propTypes.node,
};

export default Container;
