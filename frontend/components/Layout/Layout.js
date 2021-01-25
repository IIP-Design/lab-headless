import { Fragment } from 'react';
import propTypes from 'prop-types';

import Alert from 'components/Alert/Alert';
import Footer from 'components/Footer/Footer';
import GovBanner from 'components/GovBanner/GovBanner';
import Meta from 'components/Meta/Meta';

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
