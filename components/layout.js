import { Fragment } from 'react';
import { GovBanner } from '@trussworks/react-uswds';
import propTypes from 'prop-types';

import Alert from './Alert/Alert';
import Footer from './Footer/Footer';
import Meta from './meta';

const Layout = ( { preview, children } ) => (
  <Fragment>
    <Meta />
    <div className="min-h-screen">
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
