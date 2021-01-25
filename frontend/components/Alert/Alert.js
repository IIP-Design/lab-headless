import propTypes from 'prop-types';

import Container from 'components/Container/Container';

import style from './Alert.module.scss';

const Alert = ( { preview } ) => (
  <div className={ style.alert }>
    <Container>
      { preview && (
        <div className={ style.content }>
          { 'This is page is a preview. ' }
          <a
            href="/api/exit-preview"
            className={ style.link }
          >
            Click here
          </a>
          { ' to exit preview mode.' }
        </div>
      ) }
    </Container>
  </div>
);

Alert.propTypes = {
  preview: propTypes.bool,
};

export default Alert;
