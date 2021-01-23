import { Fragment, useState } from 'react';
import propTypes from 'prop-types';

const getCopy = ( language, tld ) => {
  const lock = (
    <span className="icon-lock">
      <img src="/uswds/lock.svg" height="11px" className="usa-banner__lock-image" alt="lock" />
    </span>
  );

  switch ( language ) {
    case 'spanish':
      return {
        header: 'Un sitio oficial del Gobierno de Estados Unidos',
        headerAction: 'Así es como usted puede verificarlo',
        tldSectionHeader: `Los sitios web oficiales usan ${tld}`,
        tldSectionContent: ( () => {
          const org = tld === '.mil' ? 'Departamento de Defensa de EE. UU.' : 'Gobierno de Estados Unidos.';

          return (
            <Fragment>
              { 'Un sitio web ' }
              <strong>{ tld === '.mil' ? '.mil' : '.gov' }</strong>
              { ` pertenece a una organización oficial del ${org}` }
            </Fragment>
          );
        } )(),
        httpsSectionHeader: `Los sitios web seguros ${tld} usan HTTPS`,
        httpsSectionContent: (
          <Fragment>
            { 'Un ' }
            <strong>
              { 'candado ( ' }
              { lock }
              { ' )' }
            </strong>
            { ' o ' }
            <strong>https://</strong>
            { ` significa que usted se conectó de forma segura a un sitio web ${tld}. Comparta información sensible sólo en sitios web oficiales y seguros.` }
          </Fragment>
        ),
      };
    case 'english':
    default:
      return {
        header: 'An official website of the United States government',
        headerAction: 'Here’s how you know',
        tldSectionHeader: `Official websites use ${tld}`,
        tldSectionContent: ( () => {
          const org = tld === '.mil' ? 'U.S. Department of Defense organization.' : 'government organization in the United States.';

          return (
            <Fragment>
              { 'A ' }
              <strong>{ tld === '.mil' ? '.mil' : '.gov' }</strong>
              { ` website belongs to an official ${org}` }
            </Fragment>
          );
        } )(),
        httpsSectionHeader: `Secure ${tld} websites use HTTPS`,
        httpsSectionContent: (
          <Fragment>
            { 'A ' }
            <strong>
              { 'lock ( ' }
              { lock }
              { ' )' }
            </strong>
            { ' or ' }
            <strong>https://</strong>
            { ` means you’ve safely connected to the ${tld} website. Share sensitive information only on official, secure websites.` }
          </Fragment>
        ),
      };
  }
};


const GovBanner = ( { language = 'english', tld = '.gov', ...sectionProps } ) => {
  const [isOpen, setOpenState] = useState( false );

  const copy = getCopy( language, tld );

  return (
    <section className="usa-banner" data-testid="govBanner" { ...sectionProps }>
      <div className="usa-accordion">
        <header className="usa-banner__header">
          <div className="usa-banner__inner">
            <div className="grid-col-auto">
              <img
                className="usa-banner__header-flag"
                src="/uswds/us_flag_small.png"
                alt="U.S. flag"
              />
            </div>
            <div className="grid-col-fill tablet:grid-col-auto">
              <p className="usa-banner__header-text">{ copy.header }</p>
              <p className="usa-banner__header-action" aria-hidden="true">
                { copy.headerAction }
              </p>
            </div>
            <button
              type="button"
              className="usa-accordion__button usa-banner__button"
              aria-expanded={ isOpen }
              aria-controls="gov-banner"
              onClick={ () => {
                setOpenState( !isOpen );
              } }
            >
              <span className="usa-banner__button-text">
                { copy.headerAction }
              </span>
            </button>
          </div>
        </header>
        <div
          className="usa-banner__content usa-accordion__content"
          id="gov-banner"
          hidden={ !isOpen }
        >
          <div className="grid-row grid-gap-lg">
            <div className="usa-banner__guidance tablet:grid-col-6">
              <img
                className="usa-banner__icon usa-media-block__img"
                src="/uswds/icon-dot-gov.svg"
                alt="Dot gov"
              />
              <div className="usa-media-block__body">
                <p>
                  <strong>{ copy.tldSectionHeader }</strong>
                  <br />
                  { copy.tldSectionContent }
                </p>
              </div>
            </div>
            <div className="usa-banner__guidance tablet:grid-col-6">
              <img
                className="usa-banner__icon usa-media-block__img"
                src="/uswds/icon-https.svg"
                alt="Https"
              />
              <div className="usa-media-block__body">
                <p>
                  <strong>{ copy.httpsSectionHeader }</strong>
                  <br />
                  { copy.httpsSectionContent }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

GovBanner.propTypes = {
  language: propTypes.string,
  tld: propTypes.string,
};

export default GovBanner;
