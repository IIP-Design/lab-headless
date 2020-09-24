import '../styles/index.css';
import '../node_modules/@trussworks/react-uswds/lib/index.css';
import '../node_modules/@trussworks/react-uswds/lib/uswds.css';

const MyApp = ( { Component, pageProps } ) => <Component { ...pageProps } />;

export default MyApp;
