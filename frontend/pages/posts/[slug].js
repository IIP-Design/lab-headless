import { Fragment } from 'react';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Container from '../../components/Container/Container';
import PostBody from '../../components/PostBody/PostBody';
import MoreStories from '../../components/MoreStoreis/MoreStories';
import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';
import PostHeader from '../../components/PostHeader/PostHeader';
import PostTitle from '../../components/PostTitle/PostTitle';
import SectionSeparator from '../../components/SectionSeparator/SectionSeparator';
import Tags from '../../components/Tags/Tags';

import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api';

const Post = ( { post, posts, preview } ) => {
  const router = useRouter();
  const morePosts = posts?.edges;

  if ( !router.isFallback && !post?.slug ) {
    return <ErrorPage statusCode={ 404 } />;
  }

  return (
    <Layout preview={ preview }>
      <Container>
        <Header />
        { router.isFallback
          ? <PostTitle>Loading…</PostTitle>
          : (
            <Fragment>
              <article>
                <Head>
                  <title>
                    { `${post.title} | GPA-LAB` }
                  </title>
                  <meta
                    property="og:image"
                    content={ post.featuredImage?.node?.sourceUrl }
                  />
                </Head>
                <PostHeader
                  title={ post.title }
                  coverImage={ post.featuredImage.node }
                  date={ post.date }
                  author={ post.author.node }
                  categories={ post.categories }
                />
                <PostBody content={ post.content } />
                <footer>
                  { post.tags.edges.length > 0 && <Tags tags={ post.tags } /> }
                </footer>
              </article>

              <SectionSeparator />
              { morePosts.length > 0 && <MoreStories posts={ morePosts } /> }
            </Fragment>
          ) }
      </Container>
    </Layout>
  );
};

export async function getStaticProps( { params, preview = false, previewData } ) {
  const data = await getPostAndMorePosts( params.slug, preview, previewData );

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map( ( { node } ) => `/posts/${node.slug}` ) || [],
    fallback: true,
  };
}

export default Post;
