import ErrorPage from 'next/error';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';

import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';
import RepoList from '../../components/RepoList/RepoList';

import { getAllDocsWithSlug } from '../../lib/api';

const Docs = ( { preview, repos } ) => {
  const router = useRouter();

  // if ( !router.isFallback && !doc?.slug ) {
  //   return <ErrorPage statusCode={ 404 } />;
  // }

  return (
    <Layout preview={ preview }>
      <Header />
      <Container>
        <h1>Docs</h1>
        <RepoList repos={ repos || [] } />
      </Container>
    </Layout>
  );
};

export async function getStaticProps( { preview = false, previewData } ) {
  const allRepos = await getAllDocsWithSlug();

  return {
    props: {
      preview,
      repos: allRepos.gpalabDocsRepos.map( repo => repo ),
    },
  };
}

Docs.propTypes = {
  preview: propTypes.bool,
  repos: propTypes.arrayOf(
    propTypes.shape( {
      name: propTypes.string,
      slug: propTypes.string,
    } ),
  ),
};

export default Docs;
