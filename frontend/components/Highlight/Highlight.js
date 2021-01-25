import { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import propTypes from 'prop-types';

/**
 * Adapted from react-highlight
 *
 * @see https://github.com/akiran/react-highlight
 */
const Highlight = ( { children, className, element: Element, innerHTML, languages } ) => {
  const el = useRef( null );

  useEffect( () => {
    const nodes = el.current.querySelectorAll( 'pre code' );

    languages.forEach( lang => {
      // eslint-disable-next-line import/no-dynamic-require, node/global-require
      hljs.registerLanguage( lang, require( `highlight.js/lib/languages/${lang}` ) );
    } );

    nodes.forEach( node => hljs.highlightBlock( node ) );
  }, [languages] );

  if ( innerHTML ) {
    if ( Element ) {
      return (
        <Element ref={ el } className={ className } dangerouslySetInnerHTML={ { __html: children } } />
      );
    }

    return <div ref={ el } className={ className } dangerouslySetInnerHTML={ { __html: children } } />;
  }

  if ( Element ) {
    return <Element ref={ el } className={ className }>{ children }</Element>;
  }

  return <pre ref={ el }><code className={ className }>{ children }</code></pre>;
};

Highlight.defaultProps = {
  innerHTML: null,
  className: '',
  languages: [],
};

Highlight.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
  element: propTypes.element,
  innerHTML: propTypes.string,
  languages: propTypes.array,
};

export default Highlight;
