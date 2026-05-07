import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import FlashMessage from '../../components/admin/FlashMessage';

const Icons = {
    Dashboard: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
    ),
    Blog: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
    ),
    Gallery: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
        </svg>
    ),
    Comments: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
    ),
    Portfolio: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        </svg>
    ),
    Users: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
    ),
    Messages: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
        </svg>
    ),
    Settings: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
    ),
    Arrow: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
        </svg>
    ),
    SEO: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
        </svg>
    ),
    UserManagement: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
    ),
    Plugin: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
    ),
    Scripts: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5h16M4 19h16M8 5v14M16 5v14"/>
        </svg>
    ),
    Tags: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
    ),
    Email: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9 2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
        </svg>
    ),
};

// Beautiful Logo Component with external image
const AdminLogo = ({ collapsed }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? 0 : '0.75rem',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
    }}>
        {/* Logo image wrapper */}
        <div className="logo-icon-wrap" style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(37,99,235,0.20)',
            border: '1.5px solid #e8edf5',
            overflow: 'hidden',
            position: 'relative',
        }}>
            <img
                src="https://th.bing.com/th/id/OIP.SZtZhCfXEELYGPvKWWc2IQHaHa?w=187&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
                alt="Logo"
                style={{
                    width: '80%',
                    height: '80%',
                    objectFit: 'contain',
                    display: 'block',
                }}
                onError={(e) => {
                    // Fallback to gradient SVG if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)';
                    e.currentTarget.parentElement.innerHTML = `
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 3L3 21h3.5l1.5-4h8l1.5 4H21L12 3z" fill="white" opacity="0.95"/>
                        </svg>`;
                }}
            />
        </div>

        {/* Brand text */}
        {!collapsed && (
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    letterSpacing: '-0.3px',
                    whiteSpace: 'nowrap',
                }}>
                    Admin
                    <span style={{
                        background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginLeft: 4,
                    }}>Panel</span>
                </span>
                <span style={{
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    color: '#94a3b8',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginTop: 2,
                }}>Management System</span>
            </div>
        )}
    </div>
);

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: Icons.Dashboard },
    {
        label: 'Blog', href: '/admin/blog', icon: Icons.Blog,
        children: [
            { label: 'Blog', href: '/admin/blog', icon: Icons.Blog },
            { label: 'Gallery', href: '/admin/gallery', icon: Icons.Gallery },
            { label: 'Comments', href: '/admin/comments', icon: Icons.Comments },
        ],
    },
    { label: 'Portfolio', href: '/admin/portfolio', icon: Icons.Portfolio },
    { label: 'Messages', href: '/admin/messages', icon: Icons.Messages },
    {
        label: 'Settings', href: '/admin/settings', icon: Icons.Settings,
        children: [
            { label: 'General Setting', href: '/admin/settings', icon: Icons.Settings },
            { label: 'Email Setting', href: '/admin/settings/email', icon: Icons.Email },
            { label: 'SEO', href: '/admin/settings/seo', icon: Icons.SEO },
            {
                label: 'User Management',
                href: '/admin/settings/user-management',
                icon: Icons.UserManagement,
                children: [
                    { label: 'Add Role', href: '/admin/settings/user-management/add-role', icon: Icons.Settings },
                    { label: 'Add Users', href: '/admin/users', icon: Icons.Users },
                    { label: 'Permission', href: '/admin/settings/user-management/permission', icon: Icons.SEO },
                ],
            },
            {
                label: 'Plugin', href: '/admin/settings/plugin', icon: Icons.Plugin,
                children: [
                    { label: 'Add Scripts', href: '/admin/settings/scripts', icon: Icons.Scripts },
                ],
            },
            { label: 'Tags', href: '/admin/settings/tags', icon: Icons.Tags },
        ],
    },
];

export default function AdminLayout({ children, title = 'Admin Panel' }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [blogOpen, setBlogOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [userManagementOpen, setUserManagementOpen] = useState(false);
    const [pluginOpen, setPluginOpen] = useState(false);
    const { url } = usePage();

    // Auto-open submenus
    useState(() => {
        if (url.startsWith('/admin/blog') || url.startsWith('/admin/gallery') || url.startsWith('/admin/comments')) {
            setBlogOpen(true);
        }
        if (url.startsWith('/admin/settings')) {
            setSettingsOpen(true);
        }
        if (url.startsWith('/admin/settings/user-management')) {
            setUserManagementOpen(true);
        }
        if (url.startsWith('/admin/settings/plugin')) {
            setPluginOpen(true);
        }
    });

    const handleLogout = () => {
        router.post('/admin/logout');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .admin-sidebar {
                    width: ${sidebarOpen ? '240px' : '68px'};
                    background: #ffffff;
                    color: #1e293b;
                    display: flex;
                    flex-direction: column;
                    transition: width 0.25s ease;
                    overflow: hidden;
                    flex-shrink: 0;
                    border-right: 1px solid #e2e8f0;
                    box-shadow: 2px 0 8px rgba(0,0,0,0.04);
                }

                .admin-brand {
                    padding: 1.25rem 1rem;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #f1f5f9;
                    min-height: 72px;
                }

                .admin-nav { flex: 1; padding: 1rem 0.75rem; }

                .nav-section-label {
                    font-size: 0.65rem;
                    font-weight: 700;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 0 0.5rem;
                    margin-bottom: 0.5rem;
                    margin-top: 0.5rem;
                    white-space: nowrap;
                }

                .admin-nav-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.65rem 0.875rem;
                    color: #64748b;
                    text-decoration: none;
                    font-size: 0.875rem;
                    font-weight: 500;
                    transition: background 0.15s, color 0.15s;
                    white-space: nowrap;
                    cursor: pointer;
                    border: none;
                    background: none;
                    width: 100%;
                    text-align: left;
                    border-radius: 8px;
                    margin-bottom: 2px;
                }

                .admin-nav-item:hover { background: #f1f5f9; color: #1e293b; }

                .admin-nav-item.active {
                    background: #eff6ff;
                    color: #2563eb;
                    font-weight: 600;
                }

                /* ══════════════════════════════════════
                   NAV ICON ANIMATIONS
                ══════════════════════════════════════ */

                /* Base icon */
                .nav-icon {
                    display: inline-flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    transition: color 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), filter 0.25s ease;
                    color: #94a3b8;
                }
                .admin-nav-item:hover .nav-icon,
                .admin-nav-item.active .nav-icon {
                    color: #2563eb;
                    filter: drop-shadow(0 0 5px rgba(37,99,235,0.4));
                }

                /* Dashboard — pulse */
                @keyframes dashPulse {
                    0%,100% { transform: scale(1); }
                    50%     { transform: scale(1.2); }
                }
                .admin-nav-item:hover .icon-dashboard,
                .admin-nav-item.active .icon-dashboard {
                    animation: dashPulse 1s ease-in-out infinite;
                }

                /* Blog — bounce */
                @keyframes blogBounce {
                    0%,100% { transform: translateY(0); }
                    40%     { transform: translateY(-4px); }
                    70%     { transform: translateY(-2px); }
                }
                .admin-nav-item:hover .icon-blog,
                .admin-nav-item.active .icon-blog {
                    animation: blogBounce 0.7s ease infinite;
                }

                /* Gallery — swing */
                @keyframes gallerySwing {
                    0%,100% { transform: rotate(0deg); }
                    25%     { transform: rotate(-12deg); }
                    75%     { transform: rotate(12deg); }
                }
                .admin-nav-item:hover .icon-gallery,
                .admin-nav-item.active .icon-gallery {
                    animation: gallerySwing 0.6s ease-in-out infinite;
                    transform-origin: top center;
                }

                /* Comments — shake */
                @keyframes commentShake {
                    0%,100% { transform: translateX(0); }
                    20%     { transform: translateX(-3px); }
                    40%     { transform: translateX(3px); }
                    60%     { transform: translateX(-2px); }
                    80%     { transform: translateX(2px); }
                }
                .admin-nav-item:hover .icon-comments,
                .admin-nav-item.active .icon-comments {
                    animation: commentShake 0.5s ease infinite;
                }

                /* Portfolio — flip */
                @keyframes portfolioFlip {
                    0%,100% { transform: rotateY(0deg); }
                    50%     { transform: rotateY(180deg); }
                }
                .admin-nav-item:hover .icon-portfolio,
                .admin-nav-item.active .icon-portfolio {
                    animation: portfolioFlip 1s ease-in-out infinite;
                }

                /* Users — wobble */
                @keyframes usersWobble {
                    0%,100% { transform: rotate(0deg) scale(1); }
                    25%     { transform: rotate(-8deg) scale(1.1); }
                    75%     { transform: rotate(8deg) scale(1.1); }
                }
                .admin-nav-item:hover .icon-users,
                .admin-nav-item.active .icon-users {
                    animation: usersWobble 0.6s ease-in-out infinite;
                }

                /* Messages — ring */
                @keyframes msgRing {
                    0%,100% { transform: rotate(0deg); }
                    10%     { transform: rotate(-15deg); }
                    30%     { transform: rotate(15deg); }
                    50%     { transform: rotate(-10deg); }
                    70%     { transform: rotate(10deg); }
                    90%     { transform: rotate(-5deg); }
                }
                .admin-nav-item:hover .icon-messages,
                .admin-nav-item.active .icon-messages {
                    animation: msgRing 0.8s ease infinite;
                    transform-origin: top center;
                }

                /* Settings — spin */
                @keyframes spinGear {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                .admin-nav-item:hover .icon-settings,
                .admin-nav-item.active .icon-settings {
                    animation: spinGear 2s linear infinite;
                }

                .nav-indicator {
                    width: 3px;
                    height: 16px;
                    border-radius: 2px;
                    background: #3b82f6;
                    flex-shrink: 0;
                    margin-left: auto;
                }

                .admin-sidebar-footer {
                    padding: 0.75rem;
                    border-top: 1px solid #f1f5f9;
                }

                .admin-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

                .admin-topbar {
                    background: #ffffff;
                    border-bottom: 1px solid #e2e8f0;
                    padding: 0 1.5rem;
                    height: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-shrink: 0;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
                }

                .admin-topbar-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #0f172a;
                }

                .admin-toggle-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 8px;
                    color: #64748b;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    transition: background 0.15s;
                }

                .admin-toggle-btn:hover { background: #f1f5f9; }

                .hamburger-line {
                    width: 18px;
                    height: 2px;
                    background: #64748b;
                    border-radius: 2px;
                    transition: all 0.2s;
                }

                .admin-content { flex: 1; padding: 1.75rem; overflow-y: auto; }

                .topbar-user-badge {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #3b82f6, #2563eb);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-size: 0.85rem;
                    font-weight: 700;
                    box-shadow: 0 2px 8px rgba(59,130,246,0.3);
                }

                .topbar-label {
                    font-size: 0.8rem;
                    color: #94a3b8;
                    font-weight: 500;
                }

                .topbar-logout-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.45rem 1rem;
                    background: #fef2f2;
                    color: #dc2626;
                    border: 1px solid #fecaca;
                    border-radius: 8px;
                    font-size: 0.82rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.15s, border-color 0.15s;
                }

                .topbar-logout-btn:hover {
                    background: #fee2e2;
                    border-color: #fca5a5;
                }

                .user-dropdown-role {
                    font-size: 0.72rem;
                    color: #94a3b8;
                    margin-top: 1px;
                }

                .user-dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    width: 100%;
                    padding: 0.65rem 1rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 0.85rem;
                    font-weight: 500;
                    text-align: left;
                    transition: background 0.12s;
                    color: #374151;
                    text-decoration: none;
                }

                .user-dropdown-item:hover { background: #f8fafc; }

                .user-dropdown-item.logout {
                    color: #ef4444;
                    border-top: 1px solid #f1f5f9;
                }

                .user-dropdown-item.logout:hover { background: #fef2f2; }

                @media (max-width: 768px) {
                    .admin-sidebar { position: fixed; z-index: 100; height: 100vh; }
                    .admin-main { margin-left: 0; }
                }

                /* ── Page entry animation ── */
                @keyframes adminPageIn {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .admin-content { animation: adminPageIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }

                /* ── Sidebar slide-in ── */
                @keyframes sidebarIn {
                    from { opacity: 0; transform: translateX(-16px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                .admin-sidebar { animation: sidebarIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }

                /* ── Nav item hover lift ── */
                .admin-nav-item {
                    transition: background 0.18s, color 0.18s, transform 0.18s, box-shadow 0.18s !important;
                }
                .admin-nav-item:hover {
                    transform: translateX(3px) !important;
                    box-shadow: 0 2px 8px rgba(59,130,246,0.08) !important;
                }
                .admin-nav-item.active {
                    transform: translateX(3px) !important;
                }

                /* ── Topbar fade-down ── */
                @keyframes topbarIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .admin-topbar { animation: topbarIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }

                /* ── Hamburger lines animate on toggle ── */
                .admin-toggle-btn:hover .hamburger-line { background: #3b82f6; }

                /* ── Logout button pulse on hover ── */
                .topbar-logout-btn {
                    transition: background 0.18s, border-color 0.18s, transform 0.18s, box-shadow 0.18s !important;
                }
                .topbar-logout-btn:hover {
                    transform: translateY(-1px) !important;
                    box-shadow: 0 4px 12px rgba(220,38,38,0.15) !important;
                }

                /* ── Logo icon glow ── */
                @keyframes logoGlow {
                    0%, 100% { box-shadow: 0 4px 14px rgba(37,99,235,0.35); }
                    50%       { box-shadow: 0 4px 22px rgba(124,58,237,0.5); }
                }
                .logo-icon-wrap { animation: logoGlow 3s ease-in-out infinite; }
            `}</style>

            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <AdminLogo collapsed={!sidebarOpen} />
                </div>

                <nav className="admin-nav">
                    {sidebarOpen && <p className="nav-section-label">Main Menu</p>}
                    {NAV_ITEMS.map((item) => {
                        const isActive = url.startsWith(item.href);

                        // Item with children (submenu)
                        if (item.children) {
                            const isGroupActive = item.children.some(c => url.startsWith(c.href));
                            const isOpen = item.href === '/admin/blog' ? blogOpen : settingsOpen;
                            const setOpen = item.href === '/admin/blog' ? setBlogOpen : setSettingsOpen;
                            const iconClass = item.href === '/admin/blog' ? 'icon-blog' : 'icon-settings';
                            return (
                                <div key={item.href}>
                                    <button
                                        className={`admin-nav-item${isGroupActive ? ' active' : ''}`}
                                        onClick={() => setOpen(o => !o)}
                                        style={{ width: '100%' }}
                                    >
                                        <span className={`nav-icon ${iconClass}`}>{item.icon}</span>
                                        {sidebarOpen && <span style={{ marginLeft: '0.5rem' }}>{item.label}</span>}
                                        {sidebarOpen && (
                                            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', transition: 'transform 0.2s', display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                                        )}
                                    </button>
                                    {isOpen && sidebarOpen && (
                                        <div style={{ paddingLeft: '0.75rem', marginBottom: '0.25rem' }}>
                                            {item.children.map(child => {
                                                if (child.children) {
                                                    const childActive = url === child.href || child.children.some(sc => url === sc.href || url.startsWith(sc.href));
                                                    const isPluginChild = child.href === '/admin/settings/plugin';
                                                    const isOpen = isPluginChild ? pluginOpen : userManagementOpen;
                                                    const toggleOpen = isPluginChild ? setPluginOpen : setUserManagementOpen;
                                                    return (
                                                        <div key={child.href}>
                                                            <button
                                                                className={`admin-nav-item${childActive ? ' active' : ''}`}
                                                                onClick={() => toggleOpen(o => !o)}
                                                                style={{ fontSize: '0.82rem', paddingLeft: '1rem', width: '100%' }}
                                                            >
                                                                <span className={`nav-icon icon-user-management`}>{child.icon}</span>
                                                                <span style={{ marginLeft: '0.5rem' }}>{child.label}</span>
                                                                <span style={{ marginLeft: 'auto', fontSize: '0.7rem', transition: 'transform 0.2s', display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                                                            </button>
                                                            {isOpen && (
                                                                <div style={{ paddingLeft: '1rem', marginTop: '0.25rem' }}>
                                                                    {child.children.map(sub => {
                                                                        const subActive = url === sub.href || url.startsWith(sub.href);
                                                                        let subIconClass = 'icon-settings';
                                                                        if (sub.href.includes('/add-user')) subIconClass = 'icon-users';
                                                                        else if (sub.href.includes('/add-role')) subIconClass = 'icon-settings';
                                                                        else if (sub.href.includes('/permission')) subIconClass = 'icon-seo';
                                                                        else if (sub.href.includes('/settings/scripts')) subIconClass = 'icon-scripts';
                                                                        return (
                                                                            <Link
                                                                                key={sub.href}
                                                                                href={sub.href}
                                                                                className={`admin-nav-item${subActive ? ' active' : ''}`}
                                                                                style={{ fontSize: '0.78rem', paddingLeft: '1.5rem' }}
                                                                            >
                                                                                <span className={`nav-icon ${subIconClass}`}>{sub.icon}</span>
                                                                                <span style={{ marginLeft: '0.5rem' }}>{sub.label}</span>
                                                                                {subActive && <span className="nav-indicator"></span>}
                                                                            </Link>
                                                                        );
                                                                    })}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                }

                                                const childActive = url === child.href || (child.href !== item.href && url.startsWith(child.href));
                                                let childIconClass = 'icon-settings';
                                                if (child.href === '/admin/gallery') childIconClass = 'icon-gallery';
                                                else if (child.href === '/admin/comments') childIconClass = 'icon-comments';
                                                else if (child.href.includes('/blog')) childIconClass = 'icon-blog';
                                                else if (child.href.includes('/email')) childIconClass = 'icon-email';
                                                else if (child.href.includes('/seo')) childIconClass = 'icon-seo';
                                                else if (child.href.includes('/user-management')) childIconClass = 'icon-user-management';
                                                else if (child.href.includes('/plugin')) childIconClass = 'icon-plugin';
                                                else if (child.href.includes('/tags')) childIconClass = 'icon-tags';
                                                return (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className={`admin-nav-item${childActive ? ' active' : ''}`}
                                                        style={{ fontSize: '0.82rem', paddingLeft: '1rem' }}
                                                    >
                                                        <span className={`nav-icon ${childIconClass}`}>{child.icon}</span>
                                                        <span style={{ marginLeft: '0.5rem' }}>{child.label}</span>
                                                        {childActive && <span className="nav-indicator"></span>}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`admin-nav-item${isActive ? ' active' : ''}`}
                            >
                                <span
                                    className={`nav-icon icon-${item.href.replace('/admin/', '') || 'dashboard'}`}
                                >
                                    {item.icon}
                                </span>
                                {sidebarOpen && <span style={{ marginLeft: '0.5rem' }}>{item.label}</span>}
                                {isActive && sidebarOpen && <span className="nav-indicator"></span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="admin-sidebar-footer">
                </div>
            </aside>

            {/* Main */}
            <div className="admin-main">
                <header className="admin-topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button className="admin-toggle-btn" onClick={() => setSidebarOpen(p => !p)} aria-label="Toggle sidebar">
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                        </button>
                        <span className="admin-topbar-title">{title}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                        <span className="topbar-label">Admin Panel</span>
                        <div className="topbar-user-badge">A</div>
                        <button className="topbar-logout-btn" onClick={handleLogout}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                <polyline points="16 17 21 12 16 7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                            Logout
                        </button>
                    </div>
                </header>
                <main className="admin-content">
                    <FlashMessage />
                    {children}
                </main>
            </div>
        </div>
    );
}
