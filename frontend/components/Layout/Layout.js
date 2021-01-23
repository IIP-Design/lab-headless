import { Fragment } from 'react';
import propTypes from 'prop-types';

import Alert from '../Alert/Alert';
import Footer from '../Footer/Footer';
import GovBanner from '../GovBanner/GovBanner';
import Meta from '../Meta/Meta';

import style from './Layout.module.scss';

const Layout = ( { preview, children } ) => (
  <Fragment>
    <Meta />
    <div className={ style.main }>
      <Alert preview={ preview } />
      <GovBanner />
      <main>{ children }</main>
    </div>
    <Footer />
  </Fragment>
);

Layout.propTypes = {
  children: propTypes.node,
  preview: propTypes.bool,
};

export default Layout;
