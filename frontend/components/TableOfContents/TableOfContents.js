import { Fragment } from 'react';
import propTypes from 'prop-types';

import IconBook from '../Icons/IconBook';
import IconClock from '../Icons/IconClock';
import IconCode from '../Icons/IconCode';
import NavItem from './NavItem';

import { docsPageProps } from '../../lib/proptypes';
import { getButtonStyle } from './utils';
import { orderPages } from '../../lib/normalize';

import style from './TableOfContents.module.scss';

const TableOfContents = ( { callback, pages = [], selected } ) => {
  const { changelog, docs, index, readme } = orderPages( pages );

  return (
    <nav className={ style.nav }>
      <div className={ style.container }>
        { readme && (
          <button
            className={ getButtonStyle( true, selected === readme.pageName ) }
            type="button"
            onClick={ () => callback( readme.pageName ) }
          >
            <IconBook />
            Readme
          </button>
        ) }
        { docs && (
          <Fragment>
            <button
              className={ getButtonStyle( true, selected === index.pageName ) }
              type="button"
              onClick={ () => callback( index.pageName ) }
            >
              <IconCode />
              Docs
            </button>
            <ul className={ style.list }>
              { docs && docs.map( item => {
                if ( item.dirName ) {
                  return (
                    <Fragment>
                      <NavItem
                        callback={ callback }
                        item={ item.index }
                        selected={ selected }
                        name={ item.dirName }
                      />
                      <ul className={ style.list }>
                        { item.pages.map( page => (
                          <NavItem
                            key={ page.pagePath }
                            callback={ callback }
                            item={ page }
                            selected={ selected }
                          />
                        ) ) }
                      </ul>
                    </Fragment>
                  );
                }

                return (
                  <NavItem key={ item.pagePath } callback={ callback } item={ item } selected={ selected } />
                );
              } ) }
            </ul>
          </Fragment>
        ) }
        { changelog && (
          <button
            className={ getButtonStyle( true, selected === changelog.pageName ) }
            type="button"
            onClick={ () => callback( changelog.pageName ) }
          >
            <IconClock />
            Changelog
          </button>
        ) }
      </div>
    </nav>
  );
};

TableOfContents.propTypes = {
  callback: propTypes.func,
  pages: propTypes.arrayOf( docsPageProps ),
  selected: propTypes.string,
};

export default TableOfContents;
