import Head from 'next/head';
import propTypes from 'prop-types';

import Container from '../components/Container/Container';
import Intro from '../components/Intro/Intro';
import Layout from '../components/Layout/Layout';
import PostBody from '../components/PostBody/PostBody';

import { getHomePage } from '../lib/api';

const Index = ( { homePage, preview } ) => {
  const home = homePage?.edges?.[0]?.node;
  const source = home?.featuredImage?.node?.sourceUrl;

  const bgImage = url => ( {
    backgroundImage: `url('${url}')`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '45vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  } );

  return (
    <Layout preview={ preview }>
      <Head>
        <title>
          Hello. | GPA Digital Lab
        </title>
      </Head>
      <div style={ bgImage( source ) }>
        <Container>
          <Intro />
        </Container>
      </div>
      <Container>
        { home && (
          <PostBody content={ home.content } />
        ) }
      </Container>
    </Layout>
  );
};

Index.propTypes = {
  preview: propTypes.bool,
  homePage: propTypes.shape( {
    edges: propTypes.arrayOf( propTypes.object ),
  } ),
};

export async function getStaticProps( { preview = false } ) {
  const homePage = await getHomePage();

  return {
    props: { homePage, preview },
  };
}

export default Index;
