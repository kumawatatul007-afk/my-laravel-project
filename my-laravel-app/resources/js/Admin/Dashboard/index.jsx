import AdminLayout from '../layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

// Chart.js imports (you'll need to install: npm install chart.js react-chartjs-2)
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

// Professional Stat Card with mini sparkline style
const MetricCard = ({ label, value, trend, trendUp, accent }) => (
    <div className="metric-card-anim" style={{
        background: '#ffffff',
        borderRadius: 24,
        padding: '1.4rem 1.2rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.02)',
        border: '1px solid #f0f2f5',
        transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'; e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(0,0,0,0.12)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.03)'; }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#7c8ba0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: accent, opacity: 0.6 }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0a1c2f', letterSpacing: '-0.02em' }}>{value}</span>
            {trend !== undefined && (
                <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: trendUp ? '#10b981' : '#ef4444',
                    background: trendUp ? '#e8faf0' : '#fef2f2',
                    padding: '0.2rem 0.5rem',
                    borderRadius: 30,
                }}>
                    {trendUp ? `+${trend}%` : `-${trend}%`}
                </span>
            )}
        </div>
        <div style={{ marginTop: '0.75rem', height: 2, width: 35, background: `linear-gradient(90deg, ${accent} 0%, ${accent}40 100%)`, borderRadius: 2 }}></div>
    </div>
);

// Enhanced Chart Card Component
const ChartCard = ({ title, children, actionLink, actionText }) => (
    <div style={{
        background: '#ffffff',
        borderRadius: 24,
        boxShadow: '0 8px 24px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)',
        border: '1px solid #f0f2f5',
        overflow: 'hidden',
        transition: 'box-shadow 0.25s cubic-bezier(0.22,1,0.36,1), transform 0.25s cubic-bezier(0.22,1,0.36,1)',
        height: '100%',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 16px 40px -12px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.03)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
        <div style={{
            padding: '1.2rem 1.5rem 0.5rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f5f7fa',
        }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1a2c3e', letterSpacing: '-0.2px' }}>{title}</span>
            {actionLink && (
                <Link href={actionLink} style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    color: '#3b82f6',
                    textDecoration: 'none',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 30,
                    background: '#f8fafc',
                }}>
                    {actionText || 'View details →'}
                </Link>
            )}
        </div>
        <div style={{ padding: '1rem 1rem 1rem 1rem' }}>
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

    // Sample chart data structure - you can replace with actual backend data
    const defaultChartData = {
        weeklyActivity: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            users: [12, 19, 15, 22, 28, 24, 32],
            posts: [5, 8, 6, 12, 18, 14, 22],
        },
        categoryDistribution: {
            labels: ['Blog Posts', 'Portfolio', 'Messages', 'Users'],
            data: [
                stats?.total_blogs      ?? 0,
                stats?.total_portfolio  ?? 0,
                stats?.unread_messages  ?? 0,
                stats?.total_users      ?? 0,
            ],
            colors: ['#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']
        },
        monthlyTrend: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [4, 7, 12, 18, 24, stats?.total_users ?? 0],
        }
    };

    const data = chartData || defaultChartData;

    // Line chart options
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', labels: { boxWidth: 10, font: { size: 10, family: "'Inter', system-ui" } } },
            tooltip: { backgroundColor: '#1e293b', titleColor: '#fff', bodyColor: '#cbd5e1', padding: 8, cornerRadius: 8 }
        },
        scales: {
            y: { grid: { color: '#f1f5f9', drawBorder: false }, ticks: { font: { size: 10 } } },
            x: { grid: { display: false }, ticks: { font: { size: 10 } } }
        },
        elements: { line: { tension: 0.3, borderWidth: 2 }, point: { radius: 3, hoverRadius: 5, borderWidth: 2, backgroundColor: '#fff' } }
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1e293b', cornerRadius: 8 } },
        scales: { y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } }, x: { ticks: { font: { size: 10 } } } }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: { legend: { position: 'bottom', labels: { font: { size: 10, family: "'Inter', system-ui" }, boxWidth: 10, padding: 12 } }, tooltip: { backgroundColor: '#1e293b' } }
    };

    const weeklyLineData = {
        labels: data.weeklyActivity.labels,
        datasets: [
            { label: 'New Users', data: data.weeklyActivity.users, borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.05)', fill: true, pointBackgroundColor: '#3b82f6', pointBorderColor: '#fff' },
            { label: 'Posts Created', data: data.weeklyActivity.posts, borderColor: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.03)', fill: true, pointBackgroundColor: '#f59e0b', pointBorderColor: '#fff' }
        ]
    };

    const distributionData = {
        labels: data.categoryDistribution.labels,
        datasets: [{ data: data.categoryDistribution.data, backgroundColor: data.categoryDistribution.colors, borderWidth: 0, borderRadius: 6, hoverOffset: 8 }]
    };

    const trendBarData = {
        labels: data.monthlyTrend.labels,
        datasets: [{ label: 'Total Users', data: data.monthlyTrend.data, backgroundColor: '#8b5cf6', borderRadius: 8, barPercentage: 0.65, categoryPercentage: 0.8 }]
    };

    return (
        <AdminLayout title="Dashboard">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');
                * { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
                .metrics-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1.2rem; margin-bottom: 2rem; }
                .charts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-bottom: 1.8rem; }
                .full-width-chart { margin-bottom: 1.8rem; }
                .two-col-tables { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 0.5rem; }
                @media (max-width: 1400px) { .metrics-grid { grid-template-columns: repeat(3, 1fr); } }
                @media (max-width: 1024px) { .charts-grid { grid-template-columns: 1fr; } .two-col-tables { grid-template-columns: 1fr; } }
                @media (max-width: 768px) { .metrics-grid { grid-template-columns: repeat(2, 1fr); } }

                /* ── Entrance animations ── */
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }

                /* Welcome banner */
                .welcome-banner {
                    animation: fadeSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) both;
                }

                /* Metric cards staggered */
                .metric-card-anim {
                    animation: fadeSlideUp 0.45s cubic-bezier(0.22,1,0.36,1) both;
                }
                .metric-card-anim:nth-child(1) { animation-delay: 0.05s; }
                .metric-card-anim:nth-child(2) { animation-delay: 0.10s; }
                .metric-card-anim:nth-child(3) { animation-delay: 0.15s; }
                .metric-card-anim:nth-child(4) { animation-delay: 0.20s; }
                .metric-card-anim:nth-child(5) { animation-delay: 0.25s; }
                .metric-card-anim:nth-child(6) { animation-delay: 0.30s; }

                /* Chart cards */
                .chart-card-anim {
                    animation: fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
                }
                .chart-card-anim:nth-child(1) { animation-delay: 0.15s; }
                .chart-card-anim:nth-child(2) { animation-delay: 0.25s; }

                .full-chart-anim {
                    animation: fadeSlideUp 0.45s cubic-bezier(0.22,1,0.36,1) 0.1s both;
                }

                /* Table rows staggered */
                .dash-table tbody tr {
                    animation: fadeSlideUp 0.35s cubic-bezier(0.22,1,0.36,1) both;
                }
                .dash-table tbody tr:nth-child(1) { animation-delay: 0.05s; }
                .dash-table tbody tr:nth-child(2) { animation-delay: 0.10s; }
                .dash-table tbody tr:nth-child(3) { animation-delay: 0.15s; }
                .dash-table tbody tr:nth-child(4) { animation-delay: 0.20s; }
                .dash-table tbody tr:nth-child(5) { animation-delay: 0.25s; }

                /* Table section */
                .tables-anim {
                    animation: fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s both;
                }
                .badge-modern { display: inline-flex; align-items: center; padding: 0.2rem 0.75rem; border-radius: 40px; font-size: 0.7rem; font-weight: 600; background: #f1f5f9; color: #334155; }
                .badge-admin-modern { background: #eef2ff; color: #4338ca; }
                .badge-user-modern { background: #e0f2fe; color: #0369a1; }
                .badge-read-modern { background: #e6f7ec; color: #11734c; }
                .badge-unread-modern { background: #fff0f0; color: #c2410c; }
                .user-avatar { width: 32px; height: 32px; border-radius: 14px; background: linear-gradient(135deg, #f0f4fe, #ffffff); display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: #3b82f6; margin-right: 0.75rem; border: 1px solid #eef2f8; }
                .dash-table { width: 100%; border-collapse: collapse; }
                .dash-table th { text-align: left; padding: 0.9rem 1.2rem; font-size: 0.65rem; font-weight: 700; color: #5b6e8c; text-transform: uppercase; letter-spacing: 0.08em; background: #fafcff; border-bottom: 1px solid #f0f4f9; }
                .dash-table td { padding: 0.9rem 1.2rem; border-bottom: 1px solid #fafcff; color: #2c3e50; font-size: 0.8rem; }
                .dash-table tr:hover td { background: #fafdff; }
            `}</style>

            {/* Welcome Section */}
            <div className="welcome-banner" style={{
                background: 'linear-gradient(115deg, #ffffff 0%, #fefeff 100%)',
                borderRadius: 28,
                padding: '1.5rem 2rem',
                marginBottom: '2rem',
                border: '1px solid #eff3f8',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
            }}>
                <div>
                    <span style={{ background: '#f1f5f9', borderRadius: 40, padding: '0.2rem 0.8rem', fontSize: '0.65rem', fontWeight: 600, color: '#475569' }}>ANALYTICS DASHBOARD</span>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0a0f1c', marginTop: '0.5rem', letterSpacing: '-0.3px' }}>{getGreeting()}, <span style={{ color: '#2563eb' }}>Admin</span></h2>
                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Monitor your platform performance at a glance</p>
                </div>
                <div style={{ background: '#f8fafd', padding: '0.5rem 1.2rem', borderRadius: 40, border: '1px solid #eef2f8' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 500, color: '#3b4a62' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
            </div>

            {/* ── Stats Metric Cards ── */}
            {/* <div className="metrics-grid">
                <MetricCard label="Total Users"       value={stats?.total_users      ?? 0} accent="#3b82f6" />
                <MetricCard label="Total Blogs"       value={stats?.total_blogs      ?? 0} accent="#f59e0b" />
                <MetricCard label="Portfolio Items"   value={stats?.total_portfolio  ?? 0} accent="#8b5cf6" />
                <MetricCard label="Unread Messages"   value={stats?.unread_messages  ?? 0} accent="#ef4444" />
                <MetricCard label="Published Blogs"   value={stats?.published_blogs  ?? 0} accent="#10b981" />
                <MetricCard label="Featured Projects" value={stats?.featured_projects ?? 0} accent="#f97316" />
            </div> */}


            {/* Chart Section - Professional Graphs */}
            <div className="full-chart-anim full-width-chart">
                <ChartCard title="Weekly Engagement Activity" actionLink="/admin/analytics" actionText="Full report →">
                    <div style={{ height: '280px' }}>
                        <Line data={weeklyLineData} options={lineOptions} />
                    </div>
                </ChartCard>
            </div>

            <div className="charts-grid">
                <div className="chart-card-anim">
                <ChartCard title="Content Distribution">
                    <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
                        <Doughnut data={distributionData} options={doughnutOptions} />
                    </div>
                </ChartCard>
                </div>
                <div className="chart-card-anim">
                <ChartCard title="User Growth Trend">
                    <div style={{ height: '250px' }}>
                        <Bar data={trendBarData} options={barOptions} />
                    </div>
                </ChartCard>
                </div>
            </div>

            {/* Tables Section */} 
            <div className="tables-anim two-col-tables">
                <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #f0f2f5', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f5f7fa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Recent Users</span>
                        <Link href="/admin/users" style={{ fontSize: '0.7rem', fontWeight: 600, color: '#3b82f6', textDecoration: 'none', background: '#f8fafc', padding: '0.25rem 0.9rem', borderRadius: 30 }}>View all →</Link>
                    </div> 
                    <table className="dash-table"> 
                        <thead><tr><th>User</th><th>Role</th><th>Joined</th></tr></thead>
                        <tbody>
                            {recent_users?.length > 0 ? recent_users.map(u => (
                                <tr key={u.id}><td><div style={{ display: 'flex', alignItems: 'center' }}><div className="user-avatar">{u.name?.charAt(0)}</div><div><div style={{ fontWeight: 600 }}>{u.name}</div><div style={{ fontSize: '0.7rem', color: '#7c8ba0' }}>{u.email}</div></div></div></td><td><span className={`badge-modern ${u.role === 'admin' ? 'badge-admin-modern' : 'badge-user-modern'}`}>{u.role === 'admin' ? 'Admin' : 'Member'}</span></td><td style={{ fontSize: '0.75rem', color: '#7c8ba0' }}>{new Date(u.created_at).toLocaleDateString()}</td></tr>
                            )) : <tr><td colSpan={3} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>No users yet</td></tr>}
                        </tbody>
                    </table>
                </div>
                <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #f0f2f5', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f5f7fa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Recent Messages</span>
                        <Link href="/admin/messages" style={{ fontSize: '0.7rem', fontWeight: 600, color: '#3b82f6', textDecoration: 'none', background: '#f8fafc', padding: '0.25rem 0.9rem', borderRadius: 30 }}>View all →</Link>
                    </div>
                    <table className="dash-table">
                        <thead><tr><th>From</th><th>Subject</th><th>Status</th></tr></thead>
                        <tbody>
                            {recent_messages?.length > 0 ? recent_messages.map(m => (
                                <tr key={m.id}><td><div><div style={{ fontWeight: 600 }}>{m.name}</div><div style={{ fontSize: '0.7rem', color: '#7c8ba0' }}>{m.email}</div></div></td><td style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.subject || '—'}</td><td><span className={`badge-modern ${m.is_read ? 'badge-read-modern' : 'badge-unread-modern'}`}>{m.is_read ? 'Read' : 'Unread'}</span></td></tr>
                            )) : <tr><td colSpan={3} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>No messages yet</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ marginTop: '1.8rem', paddingTop: '1rem', textAlign: 'center', fontSize: '0.65rem', color: '#93a5c1', borderTop: '1px solid #eff3f8' }}>
                Live analytics • Data updates in real-time
            </div>
        </AdminLayout>
    );
}