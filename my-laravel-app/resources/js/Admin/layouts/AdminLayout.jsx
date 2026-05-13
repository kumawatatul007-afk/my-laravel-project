import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import FlashMessage from '../../components/admin/FlashMessage';

const Icons = {
    Dashboard: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
    ),
    Category: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
    ),
    Blog: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
    ),
    BlogPost: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
    ),
    Gallery: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
        </svg>
    ),
    Comments: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
    ),
    Portfolio: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        </svg>
    ),
    Users: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
    ),
    Messages: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9 2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
        </svg>
    ),
    Settings: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
    ),
    General: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="7" width="18" height="12" rx="2"/>
            <path d="M3 11h18"/>
            <path d="M8 11v8"/>
            <path d="M16 11v8"/>
        </svg>
    ),
    Arrow: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
        </svg>
    ),
    UserManagement: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
    ),
    Role: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
            <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
            <path d="M20 8v4"/>
            <path d="M22 10h-4"/>
        </svg>
    ),
    Permission: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L4 5v6c0 5 3.58 9.74 8 11 4.42-1.26 8-6 8-11V5l-8-3z"/>
            <path d="M9 11h6"/>
            <path d="M12 14v-6"/>
        </svg>
    ),
    Plugin: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
    ),
    Scripts: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5h16M4 19h16M8 5v14M16 5v14"/>
        </svg>
    ),
    Tags: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
    ),
    Email: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9 2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
        </svg>
    ),
    Newsletter: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9 2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
            <path d="M4 10h16"/>
        </svg>
    ),
};

const AdminLogo = ({ collapsed }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? 0 : '1rem',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    }}>
        <div style={{
            width: 50,
            height: 50,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
        }}>
            <img 
                src="https://www.thenikhilsharma.in/public/admin/images/logo/GUJKF-100621-yYB.png" 
                alt="Logo" 
                style={{
                    width: 36,
                    height: 36,
                    objectFit: 'contain',
                }}
            />
        </div>
        {!collapsed && (
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                <span style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.5px',
                }}>
                    Nikhil Sharma
                </span>
                <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: '#94a3b8',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginTop: 3,
                }}>
                    Admin Panel
                </span>
            </div>
        )}
    </div>
);

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: Icons.Dashboard, animation: 'pulse' },
    { label: 'Categories', href: '/admin/categories', icon: Icons.Category, animation: 'bounce' },
    {
        label: 'Blog', href: '/admin/blog', icon: Icons.Blog, animation: 'wiggle',
        children: [
            { label: 'Blog Posts', href: '/admin/blog', icon: Icons.BlogPost, animation: 'pop' },
            { label: 'Gallery', href: '/admin/gallery', icon: Icons.Gallery, animation: 'shake' },
            { label: 'Comments', href: '/admin/comments', icon: Icons.Comments, animation: 'bounce' },
        ],
    },
    { label: 'Portfolio', href: '/admin/portfolio', icon: Icons.Portfolio, animation: 'pop' },
    { label: 'Services', href: '/admin/services', icon: Icons.General, animation: 'pop' },
    { label: 'Messages', href: '/admin/messages', icon: Icons.Messages, animation: 'shake' },
    { label: 'Newsletters', href: '/admin/newsletters', icon: Icons.Newsletter, animation: 'pulse' },
    {
        label: 'Settings', href: '/admin/settings', icon: Icons.Settings, animation: 'rotate',
        children: [
            { label: 'General', href: '/admin/settings', icon: Icons.General, animation: 'rotate' },
            { label: 'Email', href: '/admin/settings/email', icon: Icons.Email, animation: 'bounce' },
            {
                label: 'User Management',
                href: '/admin/settings/user-management',
                icon: Icons.UserManagement,
                animation: 'pop',
                children: [
                    { label: 'Add Role', href: '/admin/settings/user-management/add-role', icon: Icons.Role, animation: 'rotate' },
                    { label: 'Add Users', href: '/admin/users', icon: Icons.Users, animation: 'wiggle' },
                    { label: 'Permission', href: '/admin/settings/user-management/permission', icon: Icons.Permission, animation: 'shake' },
                ],
            },
            {
                label: 'Plugins', href: '/admin/settings/plugin', icon: Icons.Plugin, animation: 'bounce',
                children: [
                    { label: 'Scripts', href: '/admin/settings/scripts', icon: Icons.Scripts, animation: 'pulse' },
                ],
            },
            { label: 'Tags', href: '/admin/settings/tags', icon: Icons.Tags, animation: 'pop' },
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
        <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)', fontFamily: "'Inter', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .admin-sidebar {
                    width: ${sidebarOpen ? '280px' : '80px'};
                    background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
                    color: #f8fafc;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
                    overflow: hidden;
                    flex-shrink: 0;
                    box-shadow: 4px 0 24px rgba(15, 23, 42, 0.3);
                    position: relative;
                }

                .admin-sidebar::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 1px;
                    height: 100%;
                    background: linear-gradient(180deg, transparent 0%, rgba(124, 58, 237, 0.3) 50%, transparent 100%);
                }

                .admin-brand {
                    padding: 1.5rem 1.25rem;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    min-height: 80px;
                }

                .admin-nav { flex: 1; padding: 1.25rem 0.875rem; overflow-y: auto; }

                .nav-section-label {
                    font-size: 0.68rem;
                    font-weight: 700;
                    color: rgba(248, 250, 252, 0.4);
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    padding: 0 0.75rem;
                    margin: 1.5rem 0 0.75rem 0;
                    white-space: nowrap;
                }

                .admin-nav-item {
                    display: flex;
                    align-items: center;
                    gap: 0.875rem;
                    padding: 0.75rem 0.875rem;
                    color: rgba(248, 250, 252, 0.6);
                    text-decoration: none;
                    font-size: 0.875rem;
                    font-weight: 500;
                    transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
                    white-space: nowrap;
                    cursor: pointer;
                    border: none;
                    background: transparent;
                    width: 100%;
                    text-align: left;
                    border-radius: 12px;
                    margin-bottom: 0.25rem;
                    position: relative;
                }

                .admin-nav-item:hover { 
                    color: #ffffff; 
                    background: rgba(255,255,255,0.08);
                    transform: translateX(4px);
                }

                .admin-nav-item.active {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: #ffffff;
                    font-weight: 600;
                    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
                    transform: translateX(4px);
                }

                .admin-nav-item.active::before {
                    content: '';
                    position: absolute;
                    left: -12px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 4px;
                    height: 24px;
                    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
                    border-radius: 0 4px 4px 0;
                }

                .nav-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 38px;
                    height: 38px;
                    border-radius: 14px;
                    background: rgba(255,255,255,0.08);
                    color: #f8fafc;
                    flex-shrink: 0;
                    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .nav-icon svg {
                    width: 20px;
                    height: 20px;
                }

                .admin-nav-item:hover .nav-icon,
                .admin-nav-item.active .nav-icon {
                    filter: drop-shadow(0 0 8px rgba(255,255,255,0.4));
                }

                .admin-nav-item:hover .anim-bounce {
                    animation: iconBounce 0.6s ease;
                }

                .admin-nav-item:hover .anim-rotate {
                    animation: iconRotate 0.8s ease-in-out;
                }

                .admin-nav-item:hover .anim-pulse {
                    animation: iconPulse 0.5s ease-in-out;
                }

                .admin-nav-item:hover .anim-shake {
                    animation: iconShake 0.5s ease-in-out;
                }

                .admin-nav-item:hover .anim-wiggle {
                    animation: iconWiggle 0.5s ease-in-out;
                }

                .admin-nav-item:hover .anim-pop {
                    animation: iconPop 0.4s ease-in-out;
                }

                @keyframes iconBounce {
                    0%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-5px); }
                    50% { transform: translateY(-2px); }
                    70% { transform: translateY(-4px); }
                }

                @keyframes iconRotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes iconPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }

                @keyframes iconShake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-3px) rotate(-2deg); }
                    50% { transform: translateX(3px) rotate(2deg); }
                    75% { transform: translateX(-2px) rotate(-1deg); }
                }

                @keyframes iconWiggle {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-8deg); }
                    50% { transform: rotate(8deg); }
                    75% { transform: rotate(-4deg); }
                }

                @keyframes iconPop {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.25); }
                    100% { transform: scale(1); }
                }

                .nav-indicator {
                    width: 3px;
                    height: 18px;
                    border-radius: 3px;
                    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
                    flex-shrink: 0;
                    margin-left: auto;
                }

                .admin-sidebar-footer {
                    padding: 1rem;
                    border-top: 1px solid rgba(255,255,255,0.08);
                    background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%);
                }

                .admin-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

                .admin-topbar {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%);
                    backdrop-filter: blur(24px);
                    border-bottom: 1px solid rgba(102, 126, 234, 0.15);
                    padding: 0 1.75rem;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-shrink: 0;
                    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.12), 0 2px 8px rgba(15, 23, 42, 0.04);
                }

                .admin-topbar-title {
                    font-size: 1.35rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #1e293b 0%, #667eea 50%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    letter-spacing: -0.5px;
                    text-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
                }

                .admin-toggle-btn {
                    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                    border: 1px solid rgba(102, 126, 234, 0.2);
                    cursor: pointer;
                    padding: 0.875rem;
                    border-radius: 16px;
                    color: #475569;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
                }

                .admin-toggle-btn:hover { 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-color: transparent;
                    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
                    transform: translateY(-2px);
                }

                .admin-toggle-btn:hover .hamburger-line { 
                    background: white; 
                }

                .hamburger-line {
                    width: 20px;
                    height: 2.5px;
                    background: #475569;
                    border-radius: 3px;
                    transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .admin-content { 
                    flex: 1; 
                    padding: 2rem; 
                    overflow-y: auto; 
                }

                .topbar-user-badge {
                    width: 42px;
                    height: 42px;
                    border-radius: 16px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justifyContent: center;
                    color: #fff;
                    fontSize: 0.95rem;
                    fontWeight: 800;
                    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
                    border: 2px solid white;
                }

                .topbar-label {
                    font-size: 0.75rem;
                    color: #64748b;
                    font-weight: 500;
                }

                .topbar-logout-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.6rem 1.2rem;
                    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
                    color: #dc2626;
                    border: 1px solid #fecaca;
                    border-radius: 12px;
                    font-size: 0.82rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
                    box-shadow: 0 2px 8px rgba(220, 38, 38, 0.1);
                }

                .topbar-logout-btn:hover {
                    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(220, 38, 38, 0.25);
                }

                @media (max-width: 768px) {
                    .admin-sidebar { position: fixed; z-index: 100; height: 100vh; }
                    .admin-main { margin-left: 0; }
                }

                @keyframes adminPageIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .admin-content { animation: adminPageIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }

                @keyframes sidebarIn {
                    from { opacity: 0; transform: translateX(-30px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                .admin-sidebar { animation: sidebarIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both; }

                @keyframes topbarIn {
                    from { opacity: 0; transform: translateY(-12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .admin-topbar { animation: topbarIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }

                .submenu {
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
                }
            `}</style>

            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <AdminLogo collapsed={!sidebarOpen} />
                </div>

                <nav className="admin-nav">
                    {sidebarOpen && <p className="nav-section-label">Navigation</p>}
                    {NAV_ITEMS.map((item) => {
                        const isActive = url.startsWith(item.href);
                        const getAnimationClass = (anim) => {
                            switch(anim) {
                                case 'rotate': return 'anim-rotate';
                                case 'pulse': return 'anim-pulse';
                                case 'shake': return 'anim-shake';
                                case 'wiggle': return 'anim-wiggle';
                                case 'pop': return 'anim-pop';
                                default: return 'anim-bounce';
                            }
                        };

                        if (item.children) {
                            const isGroupActive = item.children.some(c => url.startsWith(c.href));
                            const isOpen = item.href.includes('/admin/blog') ? blogOpen : settingsOpen;
                            const setOpen = item.href.includes('/admin/blog') ? setBlogOpen : setSettingsOpen;
                            return (
                                <div key={item.href}>
                                    <button
                                        className={`admin-nav-item${isGroupActive ? ' active' : ''}`}
                                        onClick={() => setOpen(o => !o)}
                                        style={{ width: '100%' }}
                                    >
                                        {sidebarOpen && <span>{item.label}</span>}
                                        {sidebarOpen && (
                                            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', transition: 'transform 0.3s', display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"/>
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                    {isOpen && sidebarOpen && (
                                        <div className="submenu" style={{ paddingLeft: '0.75rem', marginBottom: '0.25rem' }}>
                                            {item.children.map(child => {
                                                if (child.children) {
                                                    const childActive = url === child.href || child.children.some(sc => url === sc.href || url.startsWith(sc.href));
                                                    const isPluginChild = child.href.includes('/plugin');
                                                    const isOpen = isPluginChild ? pluginOpen : userManagementOpen;
                                                    const toggleOpen = isPluginChild ? setPluginOpen : setUserManagementOpen;
                                                    return (
                                                        <div key={child.href}>
                                                            <button
                                                                className={`admin-nav-item${childActive ? ' active' : ''}`}
                                                                onClick={() => toggleOpen(o => !o)}
                                                                style={{ fontSize: '0.82rem', paddingLeft: '1rem', width: '100%' }}
                                                            >
                                                                <span>{child.label}</span>
                                                                <span style={{ marginLeft: 'auto', fontSize: '0.7rem', transition: 'transform 0.3s', display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <polyline points="6 9 12 15 18 9"/>
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                            {isOpen && (
                                                                <div style={{ paddingLeft: '1rem', marginTop: '0.25rem' }}>
                                                                    {child.children.map(sub => {
                                                                        const subActive = url === sub.href || url.startsWith(sub.href);
                                                                        return (
                                                                            <Link
                                                                                key={sub.href}
                                                                                href={sub.href}
                                                                                className={`admin-nav-item${subActive ? ' active' : ''}`}
                                                                                style={{ fontSize: '0.78rem', paddingLeft: '1.5rem' }}
                                                                            >
                                                                                <span>{sub.label}</span>
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
                                                return (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className={`admin-nav-item${childActive ? ' active' : ''}`}
                                                        style={{ fontSize: '0.82rem', paddingLeft: '1rem' }}
                                                    >
                                                        <span>{child.label}</span>
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
                                {sidebarOpen && <span>{item.label}</span>}
                                {isActive && sidebarOpen && <span className="nav-indicator"></span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="admin-sidebar-footer">
                    {sidebarOpen && (
                        <div style={{ 
                            padding: '0.875rem', 
                            background: 'rgba(255,255,255,0.05)', 
                            borderRadius: 12,
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.6)', marginBottom: '0.25rem' }}>Need Help?</div>
                            <div style={{ fontSize: '0.7rem', color: 'rgba(248,250,252,0.4)' }}>Contact support@nexus.io</div>
                        </div>
                    )}
                </div>
            </aside>

            <div className="admin-main">
                <header className="admin-topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <button className="admin-toggle-btn" onClick={() => setSidebarOpen(p => !p)} aria-label="Toggle sidebar">
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                        </button>
                        <span className="admin-topbar-title">{title}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>Admin User</span>
                            <span className="topbar-label">Super Admin</span>
                        </div>
                        <div className="topbar-user-badge">A</div>
                        <button className="topbar-logout-btn" onClick={handleLogout}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
