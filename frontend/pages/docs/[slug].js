import ErrorPage from 'next/error';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';

import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';

import { getAllDocsWithSlug, getDocAndMoreDocs } from '../../lib/api';

const Doc = ( { name, preview } ) => {
  const router = useRouter();

  // if ( !router.isFallback && !doc?.slug ) {
  //   return <ErrorPage statusCode={ 404 } />;
  // }

  return (
    <Layout preview={ preview }>
      <Header />
      <Container>
        <h1>{ name }</h1>
      </Container>
    </Layout>
  );
};

export async function getStaticProps( { params, preview = false, previewData } ) {
  const data = await getDocAndMoreDocs( params.slug );

  return {
    props: {
      name: data?.gpalabDocsRepo?.name || '',
      preview,
    },
  };
}

export async function getStaticPaths() {
  const allDocs = await getAllDocsWithSlug();

  return {
    paths: allDocs.gpalabDocsRepos.map( ( { slug } ) => `/docs/${slug}` ) || [],
    fallback: false,
  };
}

Doc.propTypes = {
  name: propTypes.string,
  preview: propTypes.bool,
};

export default Doc;
