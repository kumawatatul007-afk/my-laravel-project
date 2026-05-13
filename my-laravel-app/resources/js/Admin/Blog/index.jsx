import AdminLayout from '../layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import Pagination from '../../components/admin/Pagination';
import { useState } from 'react';

export default function AdminBlogIndex({ posts, filters }) {
    const [search, setSearch] = useState(filters?.search ?? '');

    const [editModal, setEditModal] = useState(false);
    const [editPost, setEditPost] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [editErrors, setEditErrors] = useState({});
    const [editLoading, setEditLoading] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false);
    const [deletePost, setDeletePost] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const applyFilters = () => {
        router.get('/admin/blog', { search }, { preserveState: true, replace: true });
    };

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

    const openDelete = (post) => {
        setDeletePost(post);
        setDeleteModal(true);
    };

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
                @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');
                
                .page-header { 
                    display: flex; 
                    align-items: center; 
                    justify-content: space-between; 
                    margin-bottom: 2rem; 
                    flex-wrap: wrap; 
                    gap: 1.25rem; 
                }
                
                .page-title { 
                    font-size: 1.5rem; 
                    font-weight: 700; 
                    color: #1e293b;
                    letter-spacing: -0.5px;
                }
                
                .btn-primary {
                    background: #2563eb;
                    color: #fff; 
                    border: none;
                    padding: 0.75rem 1.5rem; 
                    border-radius: 8px; 
                    font-size: 0.875rem;
                    font-weight: 600; 
                    cursor: pointer; 
                    text-decoration: none;
                    display: inline-flex; 
                    align-items: center; 
                    gap: 0.5rem;
                    transition: all 0.15s ease;
                }
                
                .btn-primary:hover { 
                    background: #1d4ed8;
                }
                
                .filters { 
                    display: flex; 
                    gap: 1rem; 
                    margin-bottom: 1.5rem; 
                    flex-wrap: wrap; 
                    align-items: center;
                }
                
                .filter-input {
                    padding: 0.875rem 1.25rem; 
                    border: 1px solid #e2e8f0; 
                    border-radius: 8px;
                    font-size: 0.875rem; 
                    outline: none; 
                    background: #fff;
                    color: #1e293b;
                    transition: all 0.15s ease;
                }
                
                .filter-input:focus { 
                    border-color: #2563eb; 
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); 
                }
                
                .card { 
                    background: #fff;
                    border-radius: 16px; 
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    border: 1px solid #e2e8f0;
                    overflow: hidden;
                }
                
                .table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    font-size: 0.875rem; 
                    table-layout: fixed;
                }
                
                .table th {
                    text-align: left; 
                    padding: 0.875rem 1rem; 
                    font-size: 0.75rem; 
                    font-weight: 600;
                    color: #64748b; 
                    text-transform: uppercase; 
                    border-bottom: 1px solid #e2e8f0; 
                    background: #f8fafc;
                }
                
                .table td { 
                    padding: 0.875rem 1rem; 
                    border-bottom: 1px solid #f1f5f9; 
                    color: #1e293b; 
                    vertical-align: middle;
                }
                
                .table tr:last-child td { border-bottom: none; }
                
                .table tr:hover td { 
                    background: #f8fafc;
                }
                
                .badge { 
                    display: inline-block; 
                    padding: 0.4rem 0.9rem; 
                    border-radius: 9999px; 
                    font-size: 0.75rem; 
                    font-weight: 600; 
                }
                
                .badge-cat { 
                    background: #eff6ff;
                    color: #2563eb; 
                }
                
                .btn-sm {
                    padding: 0.375rem 0.75rem; 
                    border-radius: 6px; 
                    font-size: 0.75rem; 
                    font-weight: 500;
                    cursor: pointer; 
                    border: none; 
                    text-decoration: none; 
                    display: inline-block;
                    transition: all 0.15s ease;
                }
                
                .btn-edit { 
                    background: #eff6ff;
                    color: #2563eb; 
                }
                
                .btn-edit:hover { 
                    background: #dbeafe; 
                }
                
                .btn-delete { 
                    background: #fef2f2;
                    color: #dc2626; 
                }
                
                .btn-delete:hover { 
                    background: #fee2e2; 
                }
                
                .empty { 
                    text-align: center; 
                    padding: 4rem; 
                    color: #94a3b8; 
                    font-size: 0.95rem;
                    font-weight: 500;
                }
                
                .pagination-wrap { 
                    padding: 1.25rem 1.5rem; 
                    border-top: 1px solid rgba(226, 232, 240, 0.7); 
                }
                
                .row-num { 
                    color: #cbd5e1; 
                    font-size: 0.8rem; 
                    font-weight: 600; 
                }
                
                .thumb { 
                    width: 40px; 
                    height: 40px; 
                    border-radius: 8px; 
                    object-fit: cover; 
                    background: #f1f5f9;
                }

                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                
                .page-header { animation: fadeSlideUp 0.45s cubic-bezier(0.22,1,0.36,1) both; }
                .filters { animation: fadeSlideUp 0.45s cubic-bezier(0.22,1,0.36,1) 0.08s both; }
                .card { animation: fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
                .table tbody tr { animation: fadeSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) both; }
                .table tbody tr:nth-child(1)  { animation-delay: 0.18s; }
                .table tbody tr:nth-child(2)  { animation-delay: 0.23s; }
                .table tbody tr:nth-child(3)  { animation-delay: 0.28s; }
                .table tbody tr:nth-child(4)  { animation-delay: 0.33s; }
                .table tbody tr:nth-child(5)  { animation-delay: 0.38s; }
                .table tbody tr:nth-child(6)  { animation-delay: 0.43s; }
                .table tbody tr:nth-child(7)  { animation-delay: 0.48s; }
                .table tbody tr:nth-child(8)  { animation-delay: 0.53s; }
                .table tbody tr:nth-child(9)  { animation-delay: 0.58s; }
                .table tbody tr:nth-child(10) { animation-delay: 0.63s; }

                .modal-overlay {
                    position: fixed; 
                    inset: 0; 
                    background: linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(30,41,59,0.7) 100%);
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    z-index: 1000; 
                    padding: 1.5rem;
                    animation: fadeIn 0.2s ease;
                    backdrop-filter: blur(10px);
                }
                
                @keyframes fadeIn { 
                    from { opacity: 0; } 
                    to { opacity: 1; } 
                }
                
                .modal-box {
                    background: linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%);
                    border-radius: 28px; 
                    box-shadow: 0 25px 80px rgba(15,23,42,0.35);
                    width: 100%; 
                    max-width: 650px; 
                    max-height: 90vh; 
                    overflow-y: auto;
                    animation: slideUp 0.3s cubic-bezier(0.22,1,0.36,1);
                    border: 1px solid rgba(255,255,255,0.95);
                    backdrop-filter: blur(20px);
                }
                
                @keyframes slideUp { 
                    from { transform: translateY(30px); opacity: 0; } 
                    to { transform: translateY(0); opacity: 1; } 
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .modal-header {
                    display: flex; 
                    align-items: center; 
                    justify-content: space-between;
                    padding: 1.75rem 2rem 1.25rem 2rem; 
                    border-bottom: 1px solid rgba(226, 232, 240, 0.7);
                }
                
                .modal-title { 
                    font-size: 1.25rem; 
                    font-weight: 800; 
                    color: #0f172a;
                    background: linear-gradient(135deg, #0f172a 0%, #667eea 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .modal-close {
                    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
                    border: none; 
                    cursor: pointer; 
                    color: #64748b;
                    font-size: 1.4rem; 
                    line-height: 1; 
                    padding: 0.5rem 0.85rem; 
                    border-radius: 14px;
                    transition: all 0.2s;
                }
                
                .modal-close:hover { 
                    color: #0f172a; 
                    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
                    transform: rotate(90deg);
                }
                
                .modal-body { 
                    padding: 2rem; 
                }
                
                .modal-footer {
                    display: flex; 
                    justify-content: flex-end; 
                    gap: 0.875rem;
                    padding: 1.5rem 2rem; 
                    border-top: 1px solid rgba(226, 232, 240, 0.7);
                    background: linear-gradient(180deg, transparent 0%, rgba(248,250,252,0.5) 100%);
                }
                
                .form-group { 
                    margin-bottom: 1.25rem; 
                }
                
                .form-label { 
                    display: block; 
                    font-size: 0.8rem; 
                    font-weight: 700; 
                    color: #374151; 
                    margin-bottom: 0.5rem; 
                }
                
                .form-control {
                    width: 100%; 
                    padding: 0.75rem 1rem; 
                    border: 1px solid rgba(226, 232, 240, 0.9);
                    border-radius: 14px; 
                    font-size: 0.875rem; 
                    color: #374151; 
                    outline: none;
                    background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%);
                    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
                    backdrop-filter: blur(10px);
                }
                
                .form-control:focus { 
                    border-color: #667eea; 
                    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15); 
                }
                
                .form-control.error { 
                    border-color: #ef4444; 
                }
                
                .form-error { 
                    font-size: 0.78rem; 
                    color: #ef4444; 
                    margin-top: 0.4rem;
                    font-weight: 600;
                }
                
                .form-row { 
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    gap: 1.25rem; 
                }
                
                .section-label {
                    font-size: 0.75rem; 
                    font-weight: 800; 
                    color: #64748b; 
                    text-transform: uppercase;
                    letter-spacing: 0.12em; 
                    margin: 1.75rem 0 1rem; 
                    padding-bottom: 0.6rem;
                    border-bottom: 1px solid rgba(226, 232, 240, 0.7);
                }

                .delete-modal-box {
                    background: linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%);
                    border-radius: 28px; 
                    box-shadow: 0 25px 80px rgba(15,23,42,0.35);
                    width: 100%; 
                    max-width: 450px; 
                    animation: slideUp 0.3s cubic-bezier(0.22,1,0.36,1);
                    border: 1px solid rgba(255,255,255,0.95);
                    backdrop-filter: blur(20px);
                }
                
                .delete-icon { 
                    text-align: center; 
                    margin-bottom: 1.25rem; 
                    font-size: 3.5rem; 
                }
                
                .delete-title { 
                    text-align: center; 
                    font-size: 1.25rem; 
                    font-weight: 800; 
                    color: #0f172a; 
                    margin-bottom: 0.75rem;
                    background: linear-gradient(135deg, #0f172a 0%, #dc2626 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .delete-desc { 
                    text-align: center; 
                    font-size: 0.9rem; 
                    color: #64748b; 
                    line-height: 1.6; 
                }
                
                .delete-post-name { 
                    font-weight: 700; 
                    color: #0f172a; 
                }
                
                .btn-cancel {
                    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
                    color: #475569; 
                    border: none; 
                    padding: 0.75rem 1.5rem;
                    border-radius: 14px; 
                    font-size: 0.875rem; 
                    font-weight: 700; 
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .btn-cancel:hover { 
                    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
                    transform: translateY(-2px);
                }
                
                .btn-danger {
                    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                    color: #fff; 
                    border: none; 
                    padding: 0.75rem 1.5rem;
                    border-radius: 14px; 
                    font-size: 0.875rem; 
                    font-weight: 700; 
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 16px rgba(220, 38, 38, 0.35);
                }
                
                .btn-danger:hover { 
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(220, 38, 38, 0.5);
                }
                
                .btn-danger:disabled, 
                .btn-primary:disabled { 
                    opacity: 0.6; 
                    cursor: not-allowed;
                    transform: none !important;
                }
            `}</style>

            <div className="page-header">
                <h2 className="page-title">All Blog Posts</h2>
                <Link href="/admin/blog/create" className="btn-primary">
                    New Post
                </Link>
            </div>

            <div className="filters">
                <input
                    className="filter-input"
                    placeholder="Search title or author..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && applyFilters()}
                    style={{ flex: 1, minWidth: '250px' }}
                />
                <button className="btn-primary" onClick={applyFilters}>
                    Search
                </button>
            </div>

            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: '60px' }}>#</th>
                            <th style={{ width: '20%' }}>Title</th>
                            <th style={{ width: '10%' }}>Author</th>
                            <th style={{ width: '10%' }}>Category</th>
                            <th style={{ width: '15%' }}>Meta Title</th>
                            <th style={{ width: '10%' }}>Date</th>
                            <th style={{ width: '140px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts?.data?.length > 0 ? posts.data.map((post, i) => (
                            <tr key={post.id}>
                                <td className="row-num" style={{ width: '60px' }}>{(posts.from ?? 0) + i}</td>
                                <td style={{ width: '20%' }}>
                                    <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.875rem' }}>
                                        {post.title}
                                    </div>
                                    {post.slug && (
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                                            /{post.slug}
                                        </div>
                                    )}
                                </td>
                                <td style={{ width: '10%', color: '#64748b', fontSize: '0.875rem' }}>{post.created_by || '—'}</td>
                                <td style={{ width: '10%' }}>
                                    {post.category_id
                                        ? <span className="badge badge-cat">Cat #{post.category_id}</span>
                                        : <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>—</span>
                                    }
                                </td>
                                <td style={{ width: '15%', color: '#64748b', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {post.meta_title || '—'}
                                </td>
                                <td style={{ width: '10%', color: '#64748b', fontSize: '0.875rem' }}>
                                    {post.created_at ? new Date(post.created_at).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }) : '—'}
                                </td>
                                <td style={{ width: '140px' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn-sm btn-edit" onClick={() => openEdit(post)}>
                                            Edit
                                        </button>
                                        <button className="btn-sm btn-delete" onClick={() => openDelete(post)}>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={7} className="empty">
                                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#64748b', marginBottom: '0.25rem' }}>No blog posts found</div>
                                    <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Get started by creating your first blog post</div>
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

            {editModal && (
                <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setEditModal(false)}>
                    <div className="modal-box">
                        <div className="modal-header">
                            <span className="modal-title">Edit Blog Post</span>
                            <button className="modal-close" onClick={() => setEditModal(false)}>✕</button>
                        </div>
                        <form onSubmit={submitEdit}>
                            <div className="modal-body">
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
                                <button type="button" className="btn-cancel" onClick={() => setEditModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary" disabled={editLoading}>
                                    {editLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteModal && (
                <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDeleteModal(false)}>
                    <div className="delete-modal-box">
                        <div className="modal-body" style={{ padding: '2.5rem 2rem 1.5rem' }}>
                            <div className="delete-title">Delete Blog Post?</div>
                            <div className="delete-desc">
                                Are you sure you want to delete{' '}
                                <span className="delete-post-name">"{deletePost?.title}"</span>?
                                <br /><br />This action cannot be undone and will permanently remove the post.
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => setDeleteModal(false)}>
                                Cancel
                            </button>
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
