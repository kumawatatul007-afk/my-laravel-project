import AdminLayout from '../layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';

export default function AdminPortfolioCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '', category: '', description: '', image_url: '',
        project_url: '', type: 'image', is_featured: false, sort_order: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/portfolio');
    };

    return (
        <AdminLayout title="Create Portfolio Item">
            <style>{`
                .form-card { background: #fff; border-radius: 12px; padding: 2rem; box-shadow: 0 1px 4px rgba(0,0,0,0.06); border: 1px solid #f1f5f9; max-width: 800px; }
                .form-group { margin-bottom: 1.25rem; }
                .form-label { display: block; font-size: 0.72rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.45rem; }
                .form-input {
                    width: 100%;
                    padding: 0.7rem 0.875rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    color: #0f172a;
                    outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s;
                    background: #fff;
                }
                .form-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
                .form-input.err { border-color: #ef4444; }
                .form-error { color: #ef4444; font-size: 0.78rem; margin-top: 0.3rem; }
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
                .btn-primary {
                    background: #2563eb;
                    color: #fff;
                    border: none;
                    padding: 0.7rem 1.5rem;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.15s;
                }
                .btn-primary:hover:not(:disabled) { background: #1d4ed8; }
                .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
                .btn-cancel {
                    background: #f8fafc;
                    color: #374151;
                    border: 1px solid #e2e8f0;
                    padding: 0.7rem 1.5rem;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-block;
                    transition: background 0.15s;
                }
                .btn-cancel:hover { background: #f1f5f9; }
                .checkbox-row { display: flex; align-items: center; gap: 0.5rem; }
                .page-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
                @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
            `}</style>

            <div className="page-header">
                <Link href="/admin/portfolio" className="btn-cancel">← Back</Link>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Create Portfolio Item</h2>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Title *</label>
                            <input className={`form-input${errors.title ? ' err' : ''}`} value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Project title" />
                            {errors.title && <p className="form-error">{errors.title}</p>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Category *</label>
                            <input className={`form-input${errors.category ? ' err' : ''}`} value={data.category} onChange={e => setData('category', e.target.value)} placeholder="e.g. Web Design" />
                            {errors.category && <p className="form-error">{errors.category}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea className="form-input" rows={4} value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Project description..." style={{ resize: 'vertical' }} />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Image URL</label>
                            <input className="form-input" value={data.image_url} onChange={e => setData('image_url', e.target.value)} placeholder="https://..." />
                            {errors.image_url && <p className="form-error">{errors.image_url}</p>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Project URL</label>
                            <input className="form-input" value={data.project_url} onChange={e => setData('project_url', e.target.value)} placeholder="https://..." />
                            {errors.project_url && <p className="form-error">{errors.project_url}</p>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Type *</label>
                            <select className="form-input" value={data.type} onChange={e => setData('type', e.target.value)}>
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Sort Order</label>
                            <input type="number" className="form-input" value={data.sort_order} onChange={e => setData('sort_order', parseInt(e.target.value) || 0)} min={0} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="checkbox-row">
                            <input type="checkbox" id="is_featured" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} style={{ accentColor: '#3b82f6', width: 16, height: 16 }} />
                            <label htmlFor="is_featured" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>Featured Project</label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                        <button type="submit" className="btn-primary" disabled={processing}>{processing ? 'Saving...' : 'Create Item'}</button>
                        <Link href="/admin/portfolio" className="btn-cancel">Cancel</Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
