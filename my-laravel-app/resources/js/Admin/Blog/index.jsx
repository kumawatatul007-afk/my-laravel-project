import AdminLayout from '../layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import Pagination from '../../components/admin/Pagination';
import { useState } from 'react';

export default function AdminBlogIndex({ posts, filters }) {
    const [search, setSearch] = useState(filters?.search ?? '');

    // Edit modal state
    const [editModal, setEditModal] = useState(false);
    const [editPost, setEditPost] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [editErrors, setEditErrors] = useState({});
    const [editLoading, setEditLoading] = useState(false);

    // Delete modal state
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletePost, setDeletePost] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const applyFilters = () => {
        router.get('/admin/blog', { search }, { preserveState: true, replace: true });
    };

    // Open edit modal
    const openEdit = (post) => {
        setEditPost(post);
        setEditForm({
            title:            post.title ?? '',
            description:      post.description ?? '',
            image:            post.image ?? '',
            created_by:       post.created_by ?? '',
            category_id:      post.category_id ?? '',
            meta_title:       post.meta_title ?? '',
            og_title:         post.og_title ?? '',
            og_description:   post.og_description ?? '',
            meta_keyword:     post.meta_keyword ?? '',
            image_alt:        post.image_alt ?? '',
            meta_description: post.meta_description ?? '',
        });
        setEditErrors({});
        setEditModal(true);
    };

    // Submit edit form
    const submitEdit = (e) => {
        e.preventDefault();
        setEditLoading(true);
        router.put(`/admin/blog/${editPost.id}`, editForm, {
            preserveScroll: true,
            onSuccess: () => {
                setEditModal(false);
                setEditLoading(false);
            },
            onError: (errors) => {
                setEditErrors(errors);
                setEditLoading(false);
            },
        });
    };

    // Open delete modal
    const openDelete = (post) => {
        setDeletePost(post);
        setDeleteModal(true);
    };

    // Confirm delete
    const confirmDelete = () => {
        setDeleteLoading(true);
        router.delete(`/admin/blog/${deletePost.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteModal(false);
                setDeleteLoading(false);
            },
            onFinish: () => setDeleteLoading(false),
        });
    };

    return (
        <AdminLayout title="Blog Posts">
            <style>{`
                .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
                .page-title { font-size: 1.1rem; font-weight: 700; color: #0f172a; }
                .btn-primary {
                    background: #2563eb; color: #fff; border: none;
                    padding: 0.6rem 1.25rem; border-radius: 8px; font-size: 0.875rem;
                    font-weight: 600; cursor: pointer; text-decoration: none;
                    display: inline-flex; align-items: center; gap: 0.4rem;
                }
                .btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(37,99,235,0.25); }
                .filters { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
                .filter-input {
                    padding: 0.6rem 0.875rem; border: 1px solid #e2e8f0; border-radius: 8px;
                    font-size: 0.875rem; outline: none; background: #fff; color: #374151;
                }
                .filter-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
                .card { background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); border: 1px solid #f1f5f9; overflow: hidden; }
                .table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
                .table th {
                    text-align: left; padding: 0.75rem 1.25rem; font-size: 0.7rem; font-weight: 700;
                    color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em;
                    border-bottom: 1px solid #f1f5f9; background: #fafafa;
                }
                .table td { padding: 0.875rem 1.25rem; border-bottom: 1px solid #f8fafc; color: #374151; vertical-align: middle; }
                .table tr:last-child td { border-bottom: none; }
                .table tr:hover td { background: #fafafa; }
                .badge { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 20px; font-size: 0.7rem; font-weight: 700; }
                .badge-cat { background: #eff6ff; color: #2563eb; }
                .btn-sm {
                    padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.78rem; font-weight: 600;
                    cursor: pointer; border: none; text-decoration: none; display: inline-block;
                    transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
                }
                .btn-edit { background: #eff6ff; color: #2563eb; }
                .btn-edit:hover { background: #dbeafe; transform: translateY(-1px); box-shadow: 0 3px 8px rgba(0,0,0,0.1); }
                .btn-delete { background: #fef2f2; color: #dc2626; }
                .btn-delete:hover { background: #fee2e2; transform: translateY(-1px); box-shadow: 0 3px 8px rgba(0,0,0,0.1); }
                .empty { text-align: center; padding: 3rem; color: #94a3b8; font-size: 0.875rem; }
                .pagination-wrap { padding: 1rem 1.25rem; border-top: 1px solid #f1f5f9; }
                .row-num { color: #cbd5e1; font-size: 0.78rem; font-weight: 500; }
                .thumb { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; background: #f1f5f9; }
                .thumb-placeholder { width: 40px; height: 40px; border-radius: 6px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }

                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .page-header { animation: fadeSlideUp 0.35s cubic-bezier(0.22,1,0.36,1) both; }
                .filters { animation: fadeSlideUp 0.35s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
                .card { animation: fadeSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
                .table tbody tr { animation: fadeSlideUp 0.32s cubic-bezier(0.22,1,0.36,1) both; }
                .table tbody tr:nth-child(1)  { animation-delay: 0.12s; }
                .table tbody tr:nth-child(2)  { animation-delay: 0.17s; }
                .table tbody tr:nth-child(3)  { animation-delay: 0.22s; }
                .table tbody tr:nth-child(4)  { animation-delay: 0.27s; }
                .table tbody tr:nth-child(5)  { animation-delay: 0.32s; }
                .table tbody tr:nth-child(6)  { animation-delay: 0.37s; }
                .table tbody tr:nth-child(7)  { animation-delay: 0.42s; }
                .table tbody tr:nth-child(8)  { animation-delay: 0.47s; }
                .table tbody tr:nth-child(9)  { animation-delay: 0.52s; }
                .table tbody tr:nth-child(10) { animation-delay: 0.57s; }

                /* Modal */
                .modal-overlay {
                    position: fixed; inset: 0; background: rgba(15,23,42,0.45);
                    display: flex; align-items: center; justify-content: center;
                    z-index: 1000; padding: 1rem;
                    animation: fadeIn 0.15s ease;
                }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .modal-box {
                    background: #fff; border-radius: 14px; box-shadow: 0 20px 60px rgba(0,0,0,0.18);
                    width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto;
                    animation: slideUp 0.18s ease;
                }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .modal-header {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 1.25rem 1.5rem; border-bottom: 1px solid #f1f5f9;
                }
                .modal-title { font-size: 1rem; font-weight: 700; color: #0f172a; }
                .modal-close {
                    background: none; border: none; cursor: pointer; color: #94a3b8;
                    font-size: 1.3rem; line-height: 1; padding: 0.2rem; border-radius: 4px;
                }
                .modal-close:hover { color: #374151; }
                .modal-body { padding: 1.5rem; }
                .modal-footer {
                    display: flex; justify-content: flex-end; gap: 0.75rem;
                    padding: 1rem 1.5rem; border-top: 1px solid #f1f5f9;
                }
                .form-group { margin-bottom: 1rem; }
                .form-label { display: block; font-size: 0.8rem; font-weight: 600; color: #374151; margin-bottom: 0.35rem; }
                .form-control {
                    width: 100%; padding: 0.55rem 0.875rem; border: 1px solid #e2e8f0;
                    border-radius: 8px; font-size: 0.875rem; color: #374151; outline: none;
                    background: #fff; box-sizing: border-box;
                }
                .form-control:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
                .form-control.error { border-color: #ef4444; }
                .form-error { font-size: 0.75rem; color: #ef4444; margin-top: 0.25rem; }
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
                .section-label {
                    font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;
                    letter-spacing: 0.08em; margin: 1.25rem 0 0.75rem; padding-bottom: 0.4rem;
                    border-bottom: 1px solid #f1f5f9;
                }

                /* Delete modal */
                .delete-modal-box {
                    background: #fff; border-radius: 14px; box-shadow: 0 20px 60px rgba(0,0,0,0.18);
                    width: 100%; max-width: 400px; animation: slideUp 0.18s ease;
                }
                .delete-icon { text-align: center; margin-bottom: 1rem; font-size: 2.5rem; }
                .delete-title { text-align: center; font-size: 1rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem; }
                .delete-desc { text-align: center; font-size: 0.875rem; color: #64748b; line-height: 1.5; }
                .delete-post-name { font-weight: 600; color: #0f172a; }
                .btn-cancel {
                    background: #f1f5f9; color: #374151; border: none; padding: 0.6rem 1.25rem;
                    border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer;
                }
                .btn-cancel:hover { background: #e2e8f0; }
                .btn-danger {
                    background: #dc2626; color: #fff; border: none; padding: 0.6rem 1.25rem;
                    border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer;
                }
                .btn-danger:hover { background: #b91c1c; }
                .btn-danger:disabled, .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
            `}</style>

            <div className="page-header">
                <h2 className="page-title">All Blog Posts</h2>
                <Link href="/admin/blog/create" className="btn-primary">+ New Post</Link>
            </div>

            {/* Filters */}
            <div className="filters">
                <input
                    className="filter-input"
                    placeholder="Search title or author..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && applyFilters()}
                    style={{ flex: 1, minWidth: 200 }}
                />
                <button className="btn-primary" onClick={applyFilters}>Search</button>
            </div>

            {/* Table */}
            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category ID</th>
                            <th>Meta Title</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts?.data?.length > 0 ? posts.data.map((post, i) => (
                            <tr key={post.id}>
                                <td className="row-num">{(posts.from ?? 0) + i}</td>
                                <td>
                                    {post.image
                                        ? <img src={post.image} alt={post.image_alt || post.title} className="thumb" onError={e => { e.target.style.display='none'; }} />
                                        : <div className="thumb-placeholder">📝</div>
                                    }
                                </td>
                                <td>
                                    <div style={{ fontWeight: 600, color: '#0f172a', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {post.title}
                                    </div>
                                    {post.slug && (
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2 }}>/{post.slug}</div>
                                    )}
                                </td>
                                <td style={{ color: '#374151' }}>{post.created_by || '—'}</td>
                                <td>
                                    {post.category_id
                                        ? <span className="badge badge-cat">Cat #{post.category_id}</span>
                                        : <span style={{ color: '#cbd5e1' }}>—</span>
                                    }
                                </td>
                                <td style={{ color: '#64748b', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {post.meta_title || '—'}
                                </td>
                                <td style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                                    {post.created_at ? new Date(post.created_at).toLocaleDateString() : '—'}
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                                        <button className="btn-sm btn-edit" onClick={() => openEdit(post)}>Edit</button>
                                        <button className="btn-sm btn-delete" onClick={() => openDelete(post)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={8} className="empty">
                                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                                    No blog posts found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {posts?.links && (
                    <div className="pagination-wrap">
                        <Pagination links={posts.links} />
                    </div>
                )}
            </div>

            {/* ── EDIT MODAL ── */}
            {editModal && (
                <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setEditModal(false)}>
                    <div className="modal-box">
                        <div className="modal-header">
                            <span className="modal-title">Edit Blog Post</span>
                            <button className="modal-close" onClick={() => setEditModal(false)}>✕</button>
                        </div>
                        <form onSubmit={submitEdit}>
                            <div className="modal-body">
                                {/* Basic Info */}
                                <div className="form-group">
                                    <label className="form-label">Title *</label>
                                    <input
                                        className={`form-control${editErrors.title ? ' error' : ''}`}
                                        value={editForm.title}
                                        onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                                        placeholder="Post title"
                                    />
                                    {editErrors.title && <div className="form-error">{editErrors.title}</div>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Author *</label>
                                        <input
                                            className={`form-control${editErrors.created_by ? ' error' : ''}`}
                                            value={editForm.created_by}
                                            onChange={e => setEditForm(f => ({ ...f, created_by: e.target.value }))}
                                            placeholder="Author name"
                                        />
                                        {editErrors.created_by && <div className="form-error">{editErrors.created_by}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Category ID</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editForm.category_id}
                                            onChange={e => setEditForm(f => ({ ...f, category_id: e.target.value }))}
                                            placeholder="e.g. 3"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows={4}
                                        value={editForm.description}
                                        onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                                        placeholder="Blog content / description..."
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Image URL</label>
                                        <input
                                            className="form-control"
                                            value={editForm.image}
                                            onChange={e => setEditForm(f => ({ ...f, image: e.target.value }))}
                                            placeholder="Image filename or URL"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Image Alt Text</label>
                                        <input
                                            className="form-control"
                                            value={editForm.image_alt}
                                            onChange={e => setEditForm(f => ({ ...f, image_alt: e.target.value }))}
                                            placeholder="Alt text for image"
                                        />
                                    </div>
                                </div>

                                {/* SEO Section */}
                                <div className="section-label">SEO / Meta</div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Meta Title</label>
                                        <input
                                            className="form-control"
                                            value={editForm.meta_title}
                                            onChange={e => setEditForm(f => ({ ...f, meta_title: e.target.value }))}
                                            placeholder="Meta title"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">OG Title</label>
                                        <input
                                            className="form-control"
                                            value={editForm.og_title}
                                            onChange={e => setEditForm(f => ({ ...f, og_title: e.target.value }))}
                                            placeholder="Open Graph title"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Meta Keywords</label>
                                    <input
                                        className="form-control"
                                        value={editForm.meta_keyword}
                                        onChange={e => setEditForm(f => ({ ...f, meta_keyword: e.target.value }))}
                                        placeholder="keyword1, keyword2, ..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Meta Description</label>
                                    <textarea
                                        className="form-control"
                                        rows={2}
                                        value={editForm.meta_description}
                                        onChange={e => setEditForm(f => ({ ...f, meta_description: e.target.value }))}
                                        placeholder="Short meta description..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">OG Description</label>
                                    <textarea
                                        className="form-control"
                                        rows={2}
                                        value={editForm.og_description}
                                        onChange={e => setEditForm(f => ({ ...f, og_description: e.target.value }))}
                                        placeholder="Open Graph description..."
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setEditModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary" disabled={editLoading}>
                                    {editLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── DELETE MODAL ── */}
            {deleteModal && (
                <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDeleteModal(false)}>
                    <div className="delete-modal-box">
                        <div className="modal-body" style={{ padding: '2rem 1.5rem 1rem' }}>
                            <div className="delete-icon">🗑️</div>
                            <div className="delete-title">Delete Blog Post?</div>
                            <div className="delete-desc">
                                Are you sure you want to delete{' '}
                                <span className="delete-post-name">"{deletePost?.title}"</span>?
                                <br />This action cannot be undone.
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => setDeleteModal(false)}>Cancel</button>
                            <button className="btn-danger" onClick={confirmDelete} disabled={deleteLoading}>
                                {deleteLoading ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
