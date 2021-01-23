import ErrorPage from 'next/error';
import Head from 'next/head';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';

import Container from '../../components/Container/Container';
import DocsPage from '../../components/DocsPage/DocsPage';
import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';

import { getAllDocRepos, getDocAndMoreDocs, getRepoDocs } from '../../lib/api';
import { docsPageProps } from '../../lib/proptypes';

const Doc = ( { data, name, preview } ) => {
  const router = useRouter();

  // if ( !router.isFallback && !doc?.slug ) {
  //   return <ErrorPage statusCode={ 404 } />;
  // }

  return (
    <Layout preview={ preview }>
      <Header />
      <Container>
        <Head>
          <title>
            { `Lab Docs | ${name}` }
          </title>
        </Head>
        <h1 style={ { textAlign: 'center' } }>{ `${name} - Documentation` }</h1>
        <DocsPage data={ data } />
      </Container>
    </Layout>
  );
};

export async function getStaticProps( { params, preview = false, previewData } ) {
  const repo = await getDocAndMoreDocs( params.slug );

  const data = repo?.gpalabDocsRepo?.location ? await getRepoDocs( repo?.gpalabDocsRepo?.location ) : {};

  return {
    props: {
      name: repo?.gpalabDocsRepo?.name || '',
      data,
      preview,
    },
  };
}

export async function getStaticPaths() {
  const allDocs = await getAllDocRepos();

  return {
    paths: allDocs.gpalabDocsRepos.map( ( { slug } ) => `/docs/${slug}` ) || [],
    fallback: false,
  };
}

Doc.propTypes = {
  data: propTypes.arrayOf( docsPageProps ),
  name: propTypes.string,
  preview: propTypes.bool,
};

export default Doc;
