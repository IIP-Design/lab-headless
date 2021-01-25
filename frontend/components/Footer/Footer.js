import Container from 'components/Container/Container';

import style from './Footer.module.scss';

const Footer = () => (
  <footer className={ style.footer }>
    <Container>
      <div className={ style.content }>
        <div className={ style.text }>
          <p>
            { 'This site is managed by the ' }
            <a href="https://www.state.gov/bureaus-offices/under-secretary-for-public-diplomacy-and-public-affairs/bureau-of-global-public-affairs/">
              Bureau of Global Public Affairs
            </a>
            { ' within the ' }
            <a href="https://state.gov">U.S. Department of State</a>
          </p>
          <p>
            { 'Contact us at: ' }
            <a href="mailto:gpa-lab@america.gov">gpa-lab@america.gov</a>
          </p>
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
