import { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react'
import './index.css'
import SEO from '../../components/SEO'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="blogpage-root">
      <SEO
        title="Blog | Nikhil Sharma - Web Development Articles & Insights"
        description="Read articles on web development, UI/UX design, and software engineering by Nikhil Sharma — Full Stack Developer based in Jaipur, Rajasthan."
        keywords="Web Development Blog, React JS Tips, PHP Laravel, UI UX Design, Nikhil Sharma Blog"
      />
      <div className="container mx-auto">

        {/* Header */}
        <div className="blogpage-section-header">
          <span className="blogpage-stroke-label">My Blog</span>
          <h1 className="blogpage-big-title">Latest Articles & Insights</h1>
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af', fontFamily: "'Space Grotesk', sans-serif" }}>
            Loading posts...
          </div>
        )}

        {/* Empty state */}
        {!loading && posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af', fontFamily: "'Space Grotesk', sans-serif" }}>
            No blog posts published yet.
          </div>
        )}

        {/* Blog Cards Grid */}
        {!loading && posts.length > 0 && (
          <div className="blog-grid">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="blog-card">
                  <div className="blog-img-wrap">
                    <img
                      src={post.image_url || 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/blog-fi-1.jpg'}
                      alt={post.title}
                      className="blog-img"
                    />
                  </div>
                  <div className="blog-card-body">
                    <h4 className="blog-card-title">{post.title}</h4>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-meta">
                      <div className="blog-card-author-wrap">
                        <div className="blog-card-avatar">
                          <img
                            src="https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/client-profile-1.jpg"
                            alt={post.author}
                          />
                        </div>
                        <span className="blog-card-author">{post.author}</span>
                      </div>
                      <span className="blog-card-date">{formatDate(post.published_at)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
