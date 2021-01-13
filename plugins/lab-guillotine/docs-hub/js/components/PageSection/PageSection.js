import propTypes from 'prop-types';

import { i18nize } from '../../../../js/shared/utils/helpers';

import './PageSection.css';

const PageSection = ( { children, title } ) => (
  <section className="gpalab-docs-section-container">
    { title && (
      <h2 className="gpalab-docs-section-title">{ i18nize( title ) }</h2>
    ) }
    { children }
  </section>
);

PageSection.propTypes = {
  children: propTypes.node,
  title: propTypes.string,
};

export default PageSection;
