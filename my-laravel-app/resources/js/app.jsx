import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { router } from '@inertiajs/react';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './components/layouts/MainLayout';

// ── Professional Page Loader ──────────────────────────────────────────────────
function mountLoader() {
    // Avoid duplicate mounts
    if (document.getElementById('kiro-page-loader')) return;

    const el = document.createElement('div');
    el.id = 'kiro-page-loader';
    el.innerHTML = `
        <style>
            #kiro-page-loader {
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(248, 250, 252, 0.82);
                backdrop-filter: blur(6px);
                -webkit-backdrop-filter: blur(6px);
                opacity: 0;
                transition: opacity 0.2s ease;
                pointer-events: none;
            }
            #kiro-page-loader.visible {
                opacity: 1;
                pointer-events: all;
            }
            .kpl-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 18px;
                background: #ffffff;
                border-radius: 20px;
                padding: 36px 48px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06);
                border: 1px solid rgba(226,232,240,0.8);
                animation: kplCardIn 0.25s cubic-bezier(0.22,1,0.36,1) both;
            }
            @keyframes kplCardIn {
                from { transform: scale(0.92) translateY(8px); opacity: 0; }
                to   { transform: scale(1) translateY(0);      opacity: 1; }
            }
            .kpl-logo {
                width: 48px;
                height: 48px;
                border-radius: 14px;
                background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 6px 20px rgba(37,99,235,0.35);
                animation: kplLogoPulse 1.6s ease-in-out infinite;
            }
            @keyframes kplLogoPulse {
                0%, 100% { box-shadow: 0 6px 20px rgba(37,99,235,0.35); }
                50%       { box-shadow: 0 6px 28px rgba(124,58,237,0.55); }
            }
            .kpl-dots {
                display: flex;
                gap: 7px;
                align-items: center;
            }
            .kpl-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: linear-gradient(135deg, #2563eb, #7c3aed);
                animation: kplBounce 1.2s ease-in-out infinite;
            }
            .kpl-dot:nth-child(1) { animation-delay: 0s; }
            .kpl-dot:nth-child(2) { animation-delay: 0.18s; }
            .kpl-dot:nth-child(3) { animation-delay: 0.36s; }
            @keyframes kplBounce {
                0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
                40%            { transform: scale(1.15); opacity: 1; }
            }
            .kpl-text {
                font-family: 'Inter', system-ui, sans-serif;
                font-size: 0.78rem;
                font-weight: 600;
                color: #64748b;
                letter-spacing: 0.04em;
                text-transform: uppercase;
            }
        </style>
        <div class="kpl-card">
            <div class="kpl-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 4h3l6 10V4h3v16h-3l-6-10v10H6V4z" fill="white" opacity="0.95"/>
                </svg>
            </div>
            <div class="kpl-dots">
                <div class="kpl-dot"></div>
                <div class="kpl-dot"></div>
                <div class="kpl-dot"></div>
            </div>
            <span class="kpl-text">Loading…</span>
        </div>
    `;
    document.body.appendChild(el);

    // Trigger fade-in on next frame
    requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add('visible'));
    });
}

function unmountLoader() {
    const el = document.getElementById('kiro-page-loader');
    if (!el) return;
    el.classList.remove('visible');
    setTimeout(() => el.remove(), 220);
}

// Hook into Inertia navigation events
let loaderTimer = null;
router.on('start', () => {
    // Only show the loading overlay if navigation takes longer than 120ms.
    loaderTimer = setTimeout(() => {
        mountLoader();
        loaderTimer = null;
    }, 120);
});
router.on('finish', () => {
    if (loaderTimer) {
        clearTimeout(loaderTimer);
        loaderTimer = null;
    }
    unmountLoader();
});
router.on('error', () => {
    if (loaderTimer) {
        clearTimeout(loaderTimer);
        loaderTimer = null;
    }
    unmountLoader();
});
// ─────────────────────────────────────────────────────────────────────────────

createInertiaApp({
    title: (title) => title, // Title is fully managed by the SEO component per page
    resolve: (name) => {
        // Admin pages alag folder se load karo
        const adminPages = import.meta.glob('./Admin/**/*.jsx', { eager: true });
        // Website pages alag folder se load karo
        const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });

        // Admin pages (Admin/ se shuru hone wale) ko Admin folder se resolve karo
        if (name.startsWith('Admin/')) {
            const adminKey = `./${name}.jsx`;
            const page = adminPages[adminKey];
            if (!page) {
                console.error(`[Inertia] Admin page not found: ${name} (key: ${adminKey})`);
                return;
            }
            return page;
        }

        // Website pages ko pages/ folder se resolve karo
        const pageKey = `./pages/${name}.jsx`;
        const page = pages[pageKey];

        if (!page) {
            console.error(`[Inertia] Page not found: ${name} (key: ${pageKey})`);
            return;
        }

        // Website pages ko MainLayout wrap karo
        page.default.layout = page.default.layout
            ?? ((page) => <MainLayout>{page}</MainLayout>);

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <HelmetProvider>
                <App {...props} />
            </HelmetProvider>
        );
    },
    progress: false,   // default blue bar band kar diya
});
