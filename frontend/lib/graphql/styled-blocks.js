import { fetchAPI } from 'lib/api';

const fragmentArticleMeta = `
  postId
  source
`;

const fragmentButtonMeta = `
  addPrefix
  buttonLink
  buttonText
  buttonArrow
  buttonColor
  buttonBorder
  buttonPrefix
  id
`;

const fragmentFileMeta = `
  alt
  filename
  name
  url
`;

const fragmentVideoMeta = `
  description
  id
  title
`;

const fragmentArticleFeedMeta = `
  ... on ArticleFeedMeta {
    articles {
      ${fragmentArticleMeta}
    }
    blockBackground
    fullWidth
    subtitle
    textColor
    title
  }
`;

const fragmentHeroMeta = `
  ... on HeroMeta {
    align
    buttons {
      ${fragmentButtonMeta}
    }
    description
    files {
      ${fragmentFileMeta}
    }
    lines {
      id
      text
    }
    subtitle
    textColor
    title
    type
  }
`;

const fragmentLinkListMeta = `
  ... on LinkListMeta {
    backgroundGradient
    backgroundType
    blockBackground
    files {
      ${fragmentFileMeta}
    }
    fullWidth
    linkColor
    linkStyle
    links {
      id
      linkUrl
      linkText
    }
    title
    titleColor
    twitter
    facebook
    instagram
    youtube
  }
`;

const fragmentNavigationMeta = `
  ... on NavigationMeta {
    fullWidth
    nav {
      files {
        ${fragmentFileMeta}
      }
      link
      text
    }
    title
  }
`;

const fragmentParallaxMeta = `
  ... on ParallaxMeta {
    buttons {
      ${fragmentButtonMeta}
    }
    desc
    files {
      ${fragmentFileMeta}
    }
    fullWidth
    subtitle
    title
  }
`;

const fragmentQuoteBoxMeta = `
  ... on QuoteBoxMeta {
    backgroundGradient
    backgroundType
    blockBackground
    desc
    files {
      ${fragmentFileMeta}
    }
    fullWidth
    quote
    quoteBackground
    subtitle
    textColor
    title
  }
`;

const fragmentResourcesMeta = `
  ... on ResourcesMeta {
    fullWidth
    resources {
      articles {
        ${fragmentArticleMeta}
      }
      buttons {
        ${fragmentButtonMeta}
      }
      id
      tab
      text
      title
      videos {
        ${fragmentVideoMeta}
      }
    }
    subtitle
    title
  }
`;

const fragmentSlidesMeta = `
  ... on SlidesMeta {
    slides {
      files {
        ${fragmentFileMeta}
      }
      id
      subtitle
      text
    }
    subTitleColor
    title
  }
`;

const fragmentStatsMeta = `
  ... on StatsMeta {
    backgroundType
    blockBackground
    files {
      ${fragmentFileMeta}
    }
    fullWidth
    stats {
      desc
      id
      number
      prefix
      unit
    }
    textColor
    title
  }
`;

const fragmentTextMeta = `
  ... on TextMeta {
    articles {
      ${fragmentArticleMeta}
    }
    backgroundGradient
    backgroundType
    blockBackground
    buttons {
      ${fragmentButtonMeta}
    }
    desc
    files {
      ${fragmentFileMeta}
    }
    fullWidth
    subtitle
    textColor
    title
    videos {
      ${fragmentVideoMeta}
    }
  }
`;

const fragmentTimelineMeta = `
  ... on TimelineMeta {
    fullWidth
    timeline {
      id
      text
      year
    }
    title
  }
`;

export const getRelatedBlocks = async slug => {
  const data = await fetchAPI(
    `
    query BlocksBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        gpalabBlocks {
          id
          type
          meta {
            ${fragmentArticleFeedMeta}
            ${fragmentHeroMeta}
            ${fragmentLinkListMeta}
            ${fragmentNavigationMeta}
            ${fragmentParallaxMeta}
            ${fragmentQuoteBoxMeta}
            ${fragmentResourcesMeta}
            ${fragmentSlidesMeta}
            ${fragmentStatsMeta}
            ${fragmentTextMeta}
            ${fragmentTimelineMeta}
          }
        }
      }
    }
    `,
    {
      variables: {
        id: slug,
        idType: 'SLUG',
      },
    },
  );

  return data?.post?.gpalabBlocks || [];
};
