import AdminLayout from '../layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';

export default function AdminServicesIndex({ services = [] }) {
    const handleDelete = (id) => {
        if (confirm('Delete this service?')) {
            router.delete(`/admin/services/${id}`);
        }
    };

    return (
        <AdminLayout title="Services">
            <style>{`
                .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
                .page-title { font-size: 1.1rem; font-weight: 700; color: #0f172a; }
                .btn-primary {
                    background: #2563eb; color: #fff; border: none;
                    padding: 0.6rem 1.25rem; border-radius: 8px;
                    font-size: 0.875rem; font-weight: 600; cursor: pointer;
                    text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;
                    transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
                }
                .btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(37,99,235,0.25); }
                .card { background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); border: 1px solid #f1f5f9; overflow: hidden; animation: fadeSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
                .table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
                .table th {
                    text-align: left; padding: 0.75rem 1.25rem;
                    font-size: 0.7rem; font-weight: 700; color: #94a3b8;
                    text-transform: uppercase; letter-spacing: 0.08em;
                    border-bottom: 1px solid #f1f5f9; background: #fafafa;
                }
                .table td { padding: 0.875rem 1.25rem; border-bottom: 1px solid #f8fafc; color: #374151; vertical-align: middle; }
                .table tr:last-child td { border-bottom: none; }
                .table tr:hover td { background: #fafafa; }
                .badge { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 20px; font-size: 0.7rem; font-weight: 700; }
                .badge-active { background: #f0fdf4; color: #15803d; }
                .badge-inactive { background: #fef2f2; color: #dc2626; }
                .btn-sm {
                    padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.78rem;
                    font-weight: 600; cursor: pointer; border: none; text-decoration: none;
                    display: inline-block; transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
                }
                .btn-edit { background: #eff6ff; color: #2563eb; }
                .btn-edit:hover { background: #dbeafe; transform: translateY(-1px); box-shadow: 0 3px 8px rgba(0,0,0,0.1); }
                .btn-delete { background: #fef2f2; color: #dc2626; }
                .btn-delete:hover { background: #fee2e2; transform: translateY(-1px); box-shadow: 0 3px 8px rgba(0,0,0,0.1); }
                .empty { text-align: center; padding: 3rem; color: #94a3b8; font-size: 0.875rem; }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .page-header { animation: fadeSlideUp 0.35s cubic-bezier(0.22,1,0.36,1) both; }
                .table tbody tr { animation: fadeSlideUp 0.32s cubic-bezier(0.22,1,0.36,1) both; }
                .table tbody tr:nth-child(1)  { animation-delay: 0.12s; }
                .table tbody tr:nth-child(2)  { animation-delay: 0.17s; }
                .table tbody tr:nth-child(3)  { animation-delay: 0.22s; }
                .table tbody tr:nth-child(4)  { animation-delay: 0.27s; }
                .table tbody tr:nth-child(5)  { animation-delay: 0.32s; }
            `}</style>

            <div className="page-header">
                <h2 className="page-title">Services</h2>
                <Link href="/admin/services/create" className="btn-primary">+ New Service</Link>
            </div>

            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Subtitle</th>
                            <th>Price Range</th>
                            <th>Status</th>
                            <th>Order</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.length > 0 ? services.map((svc, i) => (
                            <tr key={svc.id}>
                                <td style={{ color: '#94a3b8' }}>{i + 1}</td>
                                <td style={{ fontWeight: 600, color: '#0f172a' }}>{svc.title}</td>
                                <td style={{ color: '#64748b', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{svc.subtitle || '—'}</td>
                                <td style={{ color: '#64748b' }}>{svc.price_range || '—'}</td>
                                <td>
                                    <span className={`badge badge-${svc.is_active ? 'active' : 'inactive'}`}>
                                        {svc.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td style={{ color: '#94a3b8' }}>{svc.sort_order}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                                        <Link href={`/admin/services/${svc.id}/edit`} className="btn-sm btn-edit">Edit</Link>
                                        <button className="btn-sm btn-delete" onClick={() => handleDelete(svc.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={7} className="empty">No services yet. Click "+ New Service" to add one.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
