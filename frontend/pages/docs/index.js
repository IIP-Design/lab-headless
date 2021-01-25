import Head from 'next/head';
import propTypes from 'prop-types';

import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';
import RepoList from '../../components/RepoList/RepoList';

import { getAllDocRepos } from '../../lib/api';

const Docs = ( { preview, repos } ) => (
  <Layout preview={ preview }>
    <Header />
    <Container>
      <Head>
        <title>
          GPA Lab Documentation Hub
        </title>
      </Head>
      <h1>GPA Lab Documentation Hub</h1>
      <RepoList repos={ repos || [] } />
    </Container>
  </Layout>
);

export async function getStaticProps( { preview = false, previewData } ) {
  const allRepos = await getAllDocRepos();

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
