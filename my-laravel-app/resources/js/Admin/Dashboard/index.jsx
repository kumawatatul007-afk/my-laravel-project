import AdminLayout from '../layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ChartCard = ({ title, children, actionLink, actionText }) => (
    <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: 28,
        boxShadow: '0 8px 32px rgba(15, 23, 42, 0.08)',
        border: '1px solid rgba(255,255,255,0.9)',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
        height: '100%',
    }}
    onMouseEnter={(e) => { 
        e.currentTarget.style.boxShadow = '0 20px 48px rgba(15, 23, 42, 0.12)'; 
        e.currentTarget.style.transform = 'translateY(-4px)'; 
    }}
    onMouseLeave={(e) => { 
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(15, 23, 42, 0.08)'; 
        e.currentTarget.style.transform = 'translateY(0)'; 
    }}
    >
        <div style={{
            padding: '1.5rem 1.75rem 0.75rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
        }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.2px' }}>{title}</span>
            {actionLink && (
                <Link href={actionLink} style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#667eea',
                    textDecoration: 'none',
                    padding: '0.35rem 0.9rem',
                    borderRadius: 30,
                    background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                    transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)';
                    e.currentTarget.style.color = '#667eea';
                }}
                >
                    {actionText || 'View details →'}
                </Link>
            )}
        </div>
        <div style={{ padding: '1.25rem 1.5rem 1.5rem 1.5rem' }}>
            {children}
        </div>
    </div>
);

export default function AdminDashboard({ stats, recent_users, recent_messages, chartData }) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const defaultChartData = {
        weeklyActivity: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            users: [12, 19, 15, 22, 28, 24, 32],
            posts: [5, 8, 6, 12, 18, 14, 22],
        },
        categoryDistribution: {
            labels: ['Blog Posts', 'Portfolio', 'Messages', 'Users'],
            data: [
                stats?.total_blogs      ?? 45,
                stats?.total_portfolio  ?? 18,
                stats?.unread_messages  ?? 23,
                stats?.total_users      ?? 156,
            ],
            colors: ['#667eea', '#f59e0b', '#ef4444', '#8b5cf6']
        },
        monthlyTrend: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [45, 78, 112, 145, 189, stats?.total_users ?? 234],
        }
    };

    const data = chartData || defaultChartData;

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11, family: "'Inter', system-ui", weight: 600 }, padding: 20, usePointStyle: true } },
            tooltip: { 
                backgroundColor: '#0f172a', 
                titleColor: '#fff', 
                bodyColor: '#cbd5e1', 
                padding: 12, 
                cornerRadius: 12,
                boxShadow: '0 8px 24px rgba(15,23,42,0.3)'
            }
        },
        scales: {
            y: { grid: { color: '#f1f5f9', drawBorder: false }, ticks: { font: { size: 11, weight: 500 } } },
            x: { grid: { display: false }, ticks: { font: { size: 11, weight: 500 } } }
        },
        elements: { line: { tension: 0.4, borderWidth: 3 }, point: { radius: 4, hoverRadius: 7, borderWidth: 3, backgroundColor: '#fff' } }
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0f172a', cornerRadius: 12, padding: 12 } },
        scales: { y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11, weight: 500 } } }, x: { ticks: { font: { size: 11, weight: 500 } } } }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: { 
            legend: { 
                position: 'bottom', 
                labels: { 
                    font: { size: 11, family: "'Inter', system-ui", weight: 600 }, 
                    boxWidth: 12, 
                    padding: 18,
                    usePointStyle: true,
                } 
            }, 
            tooltip: { 
                backgroundColor: '#0f172a', 
                cornerRadius: 12, 
                padding: 12 
            } 
        }
    };

    const weeklyLineData = {
        labels: data.weeklyActivity.labels,
        datasets: [
            { 
                label: 'New Users', 
                data: data.weeklyActivity.users, 
                borderColor: '#667eea', 
                backgroundColor: 'rgba(102, 126, 234, 0.12)', 
                fill: true, 
                pointBackgroundColor: '#667eea', 
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#667eea',
            },
            { 
                label: 'Posts Created', 
                data: data.weeklyActivity.posts, 
                borderColor: '#f59e0b', 
                backgroundColor: 'rgba(245, 158, 11, 0.08)', 
                fill: true, 
                pointBackgroundColor: '#f59e0b', 
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#f59e0b',
            }
        ]
    };

    const distributionData = {
        labels: data.categoryDistribution.labels,
        datasets: [{ 
            data: data.categoryDistribution.data, 
            backgroundColor: data.categoryDistribution.colors, 
            borderWidth: 0, 
            borderRadius: 10, 
            hoverOffset: 12 
        }]
    };

    const trendBarData = {
        labels: data.monthlyTrend.labels,
        datasets: [{ 
            label: 'Total Users', 
            data: data.monthlyTrend.data, 
            backgroundColor: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 12, 
            barPercentage: 0.65, 
            categoryPercentage: 0.8 
        }]
    };

    const gradientBarPlugin = {
        id: 'gradientBar',
        beforeDatasetsDraw: (chart) => {
            const ctx = chart.ctx;
            chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                meta.data.forEach((bar, index) => {
                    const gradient = ctx.createLinearGradient(0, bar.y, 0, bar.base);
                    gradient.addColorStop(0, '#667eea');
                    gradient.addColorStop(1, '#764ba2');
                    dataset.backgroundColor[index] = gradient;
                });
            });
        }
    };

    return (
        <AdminLayout title="Dashboard">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');
                * { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
                .charts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.75rem; margin-bottom: 1.8rem; }
                .full-width-chart { margin-bottom: 1.8rem; }
                .two-col-tables { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.75rem; margin-top: 0.5rem; }
                @media (max-width: 1024px) { .charts-grid { grid-template-columns: 1fr; } .two-col-tables { grid-template-columns: 1fr; } }

                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes pulse-glow {
                    0%,100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
                    50% { box-shadow: 0 0 0 12px rgba(102, 126, 234, 0); }
                }

                .welcome-banner {
                    animation: fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
                }

                .chart-card-anim {
                    animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
                }
                .chart-card-anim:nth-child(1) { animation-delay: 0.15s; }
                .chart-card-anim:nth-child(2) { animation-delay: 0.25s; }

                .full-chart-anim {
                    animation: fadeSlideUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both;
                }

                .dash-table tbody tr {
                    animation: fadeSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) both;
                }
                .dash-table tbody tr:nth-child(1) { animation-delay: 0.08s; }
                .dash-table tbody tr:nth-child(2) { animation-delay: 0.16s; }
                .dash-table tbody tr:nth-child(3) { animation-delay: 0.24s; }
                .dash-table tbody tr:nth-child(4) { animation-delay: 0.32s; }
                .dash-table tbody tr:nth-child(5) { animation-delay: 0.4s; }

                .tables-anim {
                    animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s both;
                }
                .badge-modern { 
                    display: inline-flex; 
                    align-items: center; 
                    padding: 0.3rem 0.9rem; 
                    border-radius: 50px; 
                    font-size: 0.72rem; 
                    font-weight: 700; 
                    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); 
                    color: #475569; 
                }
                .badge-admin-modern { 
                    background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); 
                    color: #4f46e5; 
                }
                .badge-user-modern { 
                    background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); 
                    color: #0369a1; 
                }
                .badge-read-modern { 
                    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); 
                    color: #15803d; 
                }
                .badge-unread-modern { 
                    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); 
                    color: #b45309; 
                    animation: pulse-glow 2s ease-in-out infinite;
                }
                .user-avatar { 
                    width: 38px; 
                    height: 38px; 
                    border-radius: 16px; 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    display: inline-flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 0.8rem; 
                    font-weight: 800; 
                    color: white; 
                    margin-right: 0.875rem; 
                    border: 2px solid white;
                    boxShadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                }
                .dash-table { 
                    width: 100%; 
                    border-collapse: collapse; 
                }
                .dash-table th { 
                    text-align: left; 
                    padding: 1rem 1.25rem; 
                    font-size: 0.7rem; 
                    font-weight: 800; 
                    color: #64748b; 
                    text-transform: uppercase; 
                    letter-spacing: 0.12em; 
                    background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); 
                    border-bottom: 1px solid #e2e8f0; 
                }
                .dash-table td { 
                    padding: 1rem 1.25rem; 
                    border-bottom: 1px solid #f8fafc; 
                    color: #334155; 
                    font-size: 0.82rem; 
                    font-weight: 500;
                }
                .dash-table tr:hover td { 
                    background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); 
                }
            `}</style>

            <div className="welcome-banner" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(238,242,255,0.9) 100%)',
                backdropFilter: 'blur(30px)',
                borderRadius: 28,
                padding: '2.5rem 3rem',
                marginBottom: '2.5rem',
                border: '1px solid rgba(255,255,255,0.95)',
                boxShadow: '0 10px 40px rgba(102, 126, 234, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '2rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: -50, right: -50, width: 250, height: 250, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea25 0%, #764ba218 100%)' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <span style={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                        color: 'white',
                        borderRadius: 50, 
                        padding: '0.4rem 1.2rem', 
                        fontSize: '0.7rem', 
                        fontWeight: 800, 
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.45)',
                    }}>
                        Welcome Back
                    </span>
                    <h2 style={{ 
                        fontSize: '2.25rem', 
                        fontWeight: 800, 
                        color: '#0f172a', 
                        marginTop: '1rem', 
                        letterSpacing: '-0.05em',
                        lineHeight: 1.05,
                    }}>
                        {getGreeting()}, <span style={{ 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                            WebkitBackgroundClip: 'text', 
                            WebkitTextFillColor: 'transparent', 
                            backgroundClip: 'text' 
                        }}>Admin</span>!
                    </h2>
                    <p style={{ 
                        fontSize: '1rem', 
                        color: '#64748b', 
                        marginTop: '0.75rem',
                        fontWeight: 500,
                    }}>
                        Here's what's happening with your platform today
                    </p>
                </div>
                <div style={{ 
                    position: 'relative', 
                    zIndex: 1, 
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
                    padding: '1.25rem 1.75rem', 
                    borderRadius: 24, 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 6px 24px rgba(15, 23, 42, 0.08)',
                }}>
                    <p style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: 700, 
                        color: '#334155',
                        marginBottom: '0.35rem',
                    }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    <p style={{ 
                        fontSize: '0.8rem', 
                        color: '#64748b',
                        fontWeight: 500,
                    }}>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
            </div>

            <div className="full-chart-anim full-width-chart">
                <ChartCard title="Weekly Engagement Activity" actionLink="/admin/analytics" actionText="Full report →">
                    <div style={{ height: '300px' }}>
                        <Line data={weeklyLineData} options={lineOptions} />
                    </div>
                </ChartCard>
            </div>

            <div className="charts-grid">
                <div className="chart-card-anim">
                    <ChartCard title="Content Distribution">
                        <div style={{ height: '280px', display: 'flex', justifyContent: 'center' }}>
                            <Doughnut data={distributionData} options={doughnutOptions} />
                        </div>
                    </ChartCard>
                </div>
                <div className="chart-card-anim">
                    <ChartCard title="User Growth Trend">
                        <div style={{ height: '280px' }}>
                            <Bar data={trendBarData} options={barOptions} plugins={[gradientBarPlugin]} />
                        </div>
                    </ChartCard>
                </div>
            </div>

            <div className="tables-anim two-col-tables">
                <div style={{ 
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)', 
                    backdropFilter: 'blur(20px)',
                    borderRadius: 28, 
                    border: '1px solid rgba(255,255,255,0.9)', 
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(15, 23, 42, 0.08)',
                }}>
                    <div style={{ 
                        padding: '1.25rem 1.75rem', 
                        borderBottom: '1px solid rgba(226, 232, 240, 0.6)', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                    }}>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>Recent Users</span>
                        <Link href="/admin/users" style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 700, 
                            color: '#667eea', 
                            textDecoration: 'none', 
                            background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)', 
                            padding: '0.4rem 1rem', 
                            borderRadius: 50,
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)';
                            e.currentTarget.style.color = '#667eea';
                        }}
                        >View all →</Link>
                    </div> 
                    <table className="dash-table"> 
                        <thead><tr><th>User</th><th>Role</th><th>Joined</th></tr></thead>
                        <tbody>
                            {recent_users?.length > 0 ? recent_users.map(u => (
                                <tr key={u.id}><td><div style={{ display: 'flex', alignItems: 'center' }}><div className="user-avatar">{u.name?.charAt(0)}</div><div><div style={{ fontWeight: 700, color: '#1e293b' }}>{u.name}</div><div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>{u.email}</div></div></div></td><td><span className={`badge-modern ${u.role === 'admin' ? 'badge-admin-modern' : 'badge-user-modern'}`}>{u.role === 'admin' ? 'Admin' : 'Member'}</span></td><td style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>{new Date(u.created_at).toLocaleDateString()}</td></tr>
                            )) : <tr><td colSpan={3} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontWeight: 500 }}>No users yet</td></tr>}
                        </tbody>
                    </table>
                </div>
                <div style={{ 
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)', 
                    backdropFilter: 'blur(20px)',
                    borderRadius: 28, 
                    border: '1px solid rgba(255,255,255,0.9)', 
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(15, 23, 42, 0.08)',
                }}>
                    <div style={{ 
                        padding: '1.25rem 1.75rem', 
                        borderBottom: '1px solid rgba(226, 232, 240, 0.6)', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                    }}>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>Recent Messages</span>
                        <Link href="/admin/messages" style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 700, 
                            color: '#667eea', 
                            textDecoration: 'none', 
                            background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)', 
                            padding: '0.4rem 1rem', 
                            borderRadius: 50,
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)';
                            e.currentTarget.style.color = '#667eea';
                        }}
                        >View all →</Link>
                    </div>
                    <table className="dash-table">
                        <thead><tr><th>From</th><th>Subject</th><th>Status</th></tr></thead>
                        <tbody>
                            {recent_messages?.length > 0 ? recent_messages.map(m => (
                                <tr key={m.id}><td><div><div style={{ fontWeight: 700, color: '#1e293b' }}>{m.name}</div><div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>{m.email}</div></div></td><td style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.subject || '—'}</td><td><span className={`badge-modern ${m.is_read ? 'badge-read-modern' : 'badge-unread-modern'}`}>{m.is_read ? 'Read' : 'Unread'}</span></td></tr>
                            )) : <tr><td colSpan={3} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontWeight: 500 }}>No messages yet</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', textAlign: 'center', fontSize: '0.7rem', color: '#94a3b8', borderTop: '1px solid rgba(226, 232, 240, 0.8)', fontWeight: 500 }}>
                Live analytics • Data updates in real-time
            </div>
        </AdminLayout>
    );
}
