import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import EmailListForm from '../components/EmailListForm'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

const BlogPostTemplate = ({ data, location }) => {
  React.useEffect(() => {
    let disqus = document.getElementById('disqus_thread');

    let remove_ads = setInterval(() => {
        let iframes = document.getElementsByTagName('iframe');

        for (var iframe in iframes) {
            if (typeof iframes[iframe].src === 'undefined') {
                continue;
            }

            if (iframes[iframe].src.match(/(ads-iframe)|(disqusads)/gi)) {
                iframes[iframe].style.display = 'none';
                disqus.style.width = '100%';
            }
        }
    }, 500);

    setTimeout(function () {
        clearInterval(remove_ads);
    }, 5000);
  }, []);

  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const disqusConfig = {
    url: `https://sherlock-in-barcelona.vercel.app/${location.pathname}`,
    identifier: post.id,
    title: post.title,
    language: 'pt_BR'
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        thumbnail={post.frontmatter.thumbnail.childImageSharp.fixed.src}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <CommentCount config={disqusConfig} placeholder={'...'} />
        <br/><br/>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <EmailListForm/>
        <div style={{ height: 32 }}/>
        <Disqus config={disqusConfig} />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "D [de] MMMM [de] YYYY", locale: "pt_BR")
        description
        thumbnail {
           childImageSharp {
                fixed(width: 200, height: 200) {
                  ...GatsbyImageSharpFixed
               }
            }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
