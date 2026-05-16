import { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './index.css'
import SEO from '../../components/SEO'
import { ShimmerBlogCard } from '../../components/ShimmerLoader'

const POSTS_PER_PAGE = 6

export default function BlogPage({ posts }) {

  const allPosts = posts ?? []
  const [currentPage, setCurrentPage] = useState(1)
  const [shimmer, setShimmer] = useState(true)

  // Shimmer: brief mount delay so skeleton is visible on first render
  useEffect(() => {
    const t = setTimeout(() => setShimmer(false), 600)
    return () => clearTimeout(t)
  }, [])

  // AOS init
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 })
  }, [])

  // Re-init AOS when page changes
  useEffect(() => {
    AOS.refresh()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  function formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  function getExcerpt(description) {
    if (!description) return ''
    const plain = description.replace(/<[^>]*>/g, '').trim()
    return plain.length > 150 ? plain.slice(0, 150) + '...' : plain
  }

  function getImageUrl(image) {
    if (!image) return 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/blog-fi-1.jpg'
    if (image.startsWith('http')) return image
    return `/images/blogs/${image}`
  }

  // Page number range to show
  function getPageNumbers() {
    const pages = []
    const delta = 2
    const left = Math.max(1, currentPage - delta)
    const right = Math.min(totalPages, currentPage + delta)
    for (let i = left; i <= right; i++) pages.push(i)
    return pages
  }

  return (
    <div className="blogpage-root">
      <SEO
        title="Blog | Nikhil Sharma - Web Development Articles & Insights"
        description="Read articles on web development, UI/UX design, and software engineering by Nikhil Sharma — Full Stack Developer based in Jaipur, Rajasthan."
        keywords="Web Development Blog, React JS Tips, PHP Laravel, UI UX Design, Nikhil Sharma Blog"
      />

      <div className="blogpage-container">

        {/* Header */}
        <div className="blogpage-section-header" data-aos="fade-up" data-aos-duration="800">
          <span className="blogpage-stroke-label">My Blog</span>
          <h1 className="blogpage-big-title">Latest Articles & Insights</h1>
        </div>

        {/* Empty state */}
        {!shimmer && allPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af', fontFamily: "'Space Grotesk', sans-serif" }}>
            No blog posts published yet.
          </div>
        )}

        {/* Shimmer skeleton */}
        {shimmer && (
          <div className="blog-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <ShimmerBlogCard key={i} />
            ))}
          </div>
        )}

        {/* Blog Cards Grid */}
        {!shimmer && allPosts.length > 0 && (
          <>
            <div className="blog-grid">
              {paginatedPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/${post.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  data-aos-duration="700"
                >
                  <div className="blog-card">
                    <div className="blog-img-wrap">
                      <img
                        src={getImageUrl(post.image)}
                        alt={post.image_alt || post.title}
                        className="blog-img"
                        onError={e => { e.target.src = 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/blog-fi-1.jpg' }}
                      />
                    </div>
                    <div className="blog-card-body">
                      <h4 className="blog-card-title">{post.title}</h4>
                      <p className="blog-card-excerpt">{getExcerpt(post.description)}</p>
                      <div className="blog-card-meta">
                        <div className="blog-card-author-wrap">
                          <div className="blog-card-avatar">
                            <img
                              src="https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/client-profile-1.jpg"
                              alt={post.created_by || 'Author'}
                            />
                          </div>
                          <span className="blog-card-author">{post.created_by || 'Nikhil Sharma'}</span>
                        </div>
                        <span className="blog-card-date">{formatDate(post.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="blogpage-pagination" data-aos="fade-up" data-aos-duration="600">
                {/* Prev */}
                <button
                  className="blogpage-page-btn"
                  onClick={() => setCurrentPage(p => p - 1)}
                  disabled={currentPage === 1}
                >
                  ← Prev
                </button>

                {/* First page + ellipsis */}
                {getPageNumbers()[0] > 1 && (
                  <>
                    <button className={`blogpage-page-num ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
                    {getPageNumbers()[0] > 2 && <span className="blogpage-ellipsis">…</span>}
                  </>
                )}

                {/* Page numbers */}
                {getPageNumbers().map(num => (
                  <button
                    key={num}
                    className={`blogpage-page-num ${currentPage === num ? 'active' : ''}`}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </button>
                ))}

                {/* Last page + ellipsis */}
                {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                  <>
                    {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && <span className="blogpage-ellipsis">…</span>}
                    <button className={`blogpage-page-num ${currentPage === totalPages ? 'active' : ''}`} onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
                  </>
                )}

                {/* Next */}
                <button
                  className="blogpage-page-btn"
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}
