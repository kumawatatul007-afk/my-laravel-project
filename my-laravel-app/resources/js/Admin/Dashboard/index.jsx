import AdminLayout from '../layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function AdminDashboard({ stats, recent_users, recent_messages, recent_blogs }) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <AdminLayout title="Dashboard">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                .dash-wrap * { font-family: 'Inter', system-ui, sans-serif; box-sizing: border-box; }

                .stats-grid,
                .stat-card,
                .stat-icon,
                .stat-info,
                .stat-value,
                .stat-label { display: none; }

                .section-card {
                    background: #fff;
                    border-radius: 20px;
                    box-shadow: 0 4px 24px rgba(15,23,42,0.07);
                    border: 1px solid #f1f5f9;
                    overflow: hidden;
                    margin-bottom: 1.75rem;
                }
                .section-header {
                    padding: 1.25rem 1.75rem;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .section-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #0f172a;
                }
                .view-all-btn {
                    font-size: 0.78rem;
                    font-weight: 700;
                    color: #667eea;
                    text-decoration: none;
                    padding: 0.4rem 1rem;
                    border-radius: 50px;
                    background: #eef2ff;
                    transition: all 0.2s;
                }
                .view-all-btn:hover {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: #fff;
                }

                .dash-table { width: 100%; border-collapse: collapse; }
                .dash-table th {
                    text-align: left;
                    padding: 0.875rem 1.5rem;
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    background: #f8fafc;
                    border-bottom: 1px solid #f1f5f9;
                }
                .dash-table td {
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #f8fafc;
                    color: #334155;
                    font-size: 0.85rem;
                    font-weight: 500;
                }
                .dash-table tr:last-child td { border-bottom: none; }
                .dash-table tr:hover td { background: #f8fafc; }

                .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.75rem; }
                @media (max-width: 900px) { .two-col { grid-template-columns: 1fr; } }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.3rem 0.85rem;
                    border-radius: 50px;
                    font-size: 0.72rem;
                    font-weight: 700;
                }
                .badge-admin  { background: #eef2ff; color: #4f46e5; }
                .badge-user   { background: #e0f2fe; color: #0369a1; }
                .badge-read   { background: #dcfce7; color: #15803d; }
                .badge-unread { background: #fef3c7; color: #b45309; }

                .user-avatar {
                    width: 36px; height: 36px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: 800;
                    color: #fff;
                    margin-right: 0.75rem;
                    flex-shrink: 0;
                }

                .welcome-card {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 24px;
                    padding: 2rem 2.5rem;
                    margin-bottom: 2rem;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 1rem;
                    box-shadow: 0 12px 40px rgba(102,126,234,0.35);
                    position: relative;
                    overflow: hidden;
                }
                .welcome-card::before {
                    content: '';
                    position: absolute;
                    top: -60px; right: -60px;
                    width: 220px; height: 220px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.1);
                }
                .welcome-card::after {
                    content: '';
                    position: absolute;
                    bottom: -40px; left: 30%;
                    width: 160px; height: 160px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.07);
                }
                .welcome-greeting {
                    font-size: 1.75rem;
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    position: relative;
                    z-index: 1;
                }
                .welcome-sub {
                    font-size: 0.95rem;
                    opacity: 0.85;
                    margin-top: 0.4rem;
                    font-weight: 500;
                    position: relative;
                    z-index: 1;
                }
                .welcome-date {
                    background: rgba(255,255,255,0.18);
                    border-radius: 16px;
                    padding: 1rem 1.5rem;
                    text-align: right;
                    position: relative;
                    z-index: 1;
                    backdrop-filter: blur(10px);
                }
                .welcome-date-day { font-size: 0.95rem; font-weight: 700; }
                .welcome-date-time { font-size: 0.8rem; opacity: 0.8; margin-top: 0.2rem; }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .dash-wrap { animation: fadeUp 0.4s ease both; }
            `}</style>

            <div className="dash-wrap">
                {/* Welcome Banner */}
                <div className="welcome-card">
                    <div>
                        <div className="welcome-greeting">{getGreeting()}, Admin!</div>
                        <div className="welcome-sub">Here's what's happening with your platform today.</div>
                    </div>
                    <div className="welcome-date">
                        <div className="welcome-date-day">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="welcome-date-time">
                            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                </div>

                {/* Recent Tables */}
                <div className="two-col">
                    {/* Recent Users */}
                    <div className="section-card">
                        <div className="section-header">
                            <span className="section-title">Recent Users</span>
                            <Link href="/admin/users" className="view-all-btn">View all →</Link>
                        </div>
                        <table className="dash-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent_users && recent_users.length > 0 ? (
                                    recent_users.map(u => (
                                        <tr key={u.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div className="user-avatar">{u.name?.charAt(0)?.toUpperCase()}</div>
                                                    <div>
                                                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem' }}>{u.name}</div>
                                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{u.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge ${u.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                                                    {u.role === 'admin' ? 'Admin' : 'Member'}
                                                </span>
                                            </td>
                                            <td style={{ color: '#64748b', fontSize: '0.8rem' }}>
                                                {new Date(u.created_at).toLocaleDateString('en-IN')}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Recent Messages */}
                    <div className="section-card">
                        <div className="section-header">
                            <span className="section-title">Recent Messages</span>
                            <Link href="/admin/messages" className="view-all-btn">View all →</Link>
                        </div>
                        <table className="dash-table">
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent_messages && recent_messages.length > 0 ? (
                                    recent_messages.map(m => (
                                        <tr key={m.id}>
                                            <td>
                                                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem' }}>{m.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.email}</div>
                                            </td>
                                            <td style={{ maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {m.subject || '—'}
                                            </td>
                                            <td>
                                                <span className={`badge ${m.is_read ? 'badge-read' : 'badge-unread'}`}>
                                                    {m.is_read ? 'Read' : 'Unread'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                                            No messages found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Blog Posts */}
                <div className="section-card">
                    <div className="section-header">
                        <span className="section-title">Recent Blog Posts</span>
                        <Link href="/admin/blog" className="view-all-btn">View all →</Link>
                    </div>
                    <table className="dash-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recent_blogs && recent_blogs.length > 0 ? (
                                recent_blogs.map((blog, i) => (
                                    <tr key={blog.id}>
                                        <td style={{ color: '#94a3b8', fontWeight: 600 }}>{i + 1}</td>
                                        <td style={{ fontWeight: 600, color: '#1e293b', maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {blog.title}
                                        </td>
                                        <td style={{ color: '#475569' }}>{blog.created_by || '—'}</td>
                                        <td style={{ color: '#64748b', fontSize: '0.8rem' }}>
                                            {new Date(blog.created_at).toLocaleDateString('en-IN')}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                                        No blog posts found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#94a3b8', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', fontWeight: 500 }}>
                    Admin Panel • Data updates in real-time
                </div>
            </div>
        </AdminLayout>
    );
}
