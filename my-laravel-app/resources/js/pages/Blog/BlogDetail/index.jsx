import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import './index.css'

export default function BlogDetailPage({ post: serverPost }) {
  // Slug URL se extract karo — new format: /{slug}, old: /blog/{slug}
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const pathSlug = pathParts[pathParts.length - 1] || '';

  const [post, setPost] = useState(serverPost || null);
  const [loading, setLoading] = useState(!serverPost);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (serverPost) return; // Inertia se data aa gaya, API call ki zaroorat nahi
    setLoading(true);
    fetch(`/api/blog/${pathSlug}`)
      .then(res => res.json())
      .then(data => { setPost(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [pathSlug]);

  function formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Scroll animation
  const animatedRefs = useRef([])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('bd-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    animatedRefs.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [post])

  const ref = (el) => {
    if (el && !animatedRefs.current.includes(el)) animatedRefs.current.push(el)
  }

  if (loading) {
    return (
      <div className="bd-root">
        <div style={{ textAlign: 'center', padding: '5rem', color: '#9ca3af', fontFamily: "'Space Grotesk', sans-serif" }}>
          Loading post...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bd-root">
        <div style={{ textAlign: 'center', padding: '5rem', color: '#9ca3af', fontFamily: "'Space Grotesk', sans-serif" }}>
          Post not found.{' '}
          <Link href="/blog" style={{ color: '#0A3981' }}>Back to Blog</Link>
        </div>
      </div>
    );
  }

  const comments = post.comments || [];
  const prevPost = post.prev_post || null;
  const nextPost = post.next_post || null;

  return (
    <div className="bd-root">

      {/* ── Hero image ── */}
      <div className="bd-hero">
        <img
          src={post.image_url || 'https://wpdemo.ajufbox.com/mora/wp-content/uploads/2024/11/blog-fi-1.jpg'}
          alt={post.title}
        />
      </div>

      {/* ── Content area ── */}
      <div className="bd-wrap">
        <div className="bd-inner">

          {/* Title */}
          <h1 className="bd-title">{post.title}</h1>

          {/* Meta */}
          <div className="bd-meta">
            <span>{formatDate(post.published_at)}</span>
            <span className="bd-meta-sep">—</span>
            <span>by <strong>{post.author || 'Admin'}</strong></span>
          </div>

          {/* Content */}
          <div className="bd-content">
            {post.content ? (
              <div
                className="bd-p"
                ref={ref}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="bd-p" ref={ref}>
                {post.excerpt || 'No content available for this post.'}
              </p>
            )}
          </div>

          {/* Post navigation */}
          <nav className="bd-post-nav">
            <div className="bd-post-nav-prev">
              {prevPost ? (
                <Link href={`/${prevPost.slug || prevPost.id}`}>
                  <span className="bd-nav-label">← Previous Post</span>
                  <span className="bd-nav-title">{prevPost.title}</span>
                </Link>
              ) : <span />}
            </div>
            <div className="bd-post-nav-next">
              {nextPost ? (
                <Link href={`/${nextPost.slug || nextPost.id}`}>
                  <span className="bd-nav-label">Next Post →</span>
                  <span className="bd-nav-title">{nextPost.title}</span>
                </Link>
              ) : <span />}
            </div>
          </nav>

          {/* Comments */}
          <div className="bd-comments">
            <h2 className="bd-comments-title">Comments ({comments.length})</h2>

            {comments.length > 0 && (
              <ol className="bd-comment-list" style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                {comments.map((comment) => (
                  <li key={comment.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e5e7eb', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#6b7280', fontFamily: "'Space Grotesk', sans-serif" }}>
                      {comment.name ? comment.name[0].toUpperCase() : '?'}
                    </div>
                    <div>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#131313', fontFamily: "'Space Grotesk', sans-serif" }}>{comment.name}</span>
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: "'Space Grotesk', sans-serif" }}>{formatDate(comment.created_at)}</span>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.7 }}>{comment.comment}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            <div className="bd-comment-form">
              <h3 className="bd-reply-title">Leave a Reply</h3>
              <p className="bd-comment-note">
                Your email address will not be published. Required fields are marked <span className="bd-required">*</span>
              </p>
              <form action="#" method="post">
                <div className="bd-field">
                  <label htmlFor="comment">Comment <span className="bd-required">*</span></label>
                  <textarea id="comment" name="comment" rows="4" required />
                </div>
                <div className="bd-field-row">
                  <div className="bd-field">
                    <label htmlFor="author">Name <span className="bd-required">*</span></label>
                    <input id="author" name="author" type="text" required />
                  </div>
                  <div className="bd-field">
                    <label htmlFor="email">Email <span className="bd-required">*</span></label>
                    <input id="email" name="email" type="email" required />
                  </div>
                </div>
                <div className="bd-field">
                  <label htmlFor="url">Website</label>
                  <input id="url" name="url" type="url" />
                </div>
                <div className="bd-checkbox">
                  <input id="save-info" name="save-info" type="checkbox" value="yes" />
                  <label htmlFor="save-info">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>
                <button type="submit" className="bd-submit">Post Comment</button>
              </form>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
