import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="ns-root">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .ns-root {
                    min-height: 100vh;
                    display: flex;
                    font-family: 'Inter', sans-serif;
                    background: #0a0a0f;
                    overflow: hidden;
                    position: relative;
                }

                /* ── Animated background ── */
                .ns-bg {
                    position: fixed;
                    inset: 0;
                    z-index: 0;
                    background: radial-gradient(ellipse 80% 60% at 20% 40%, rgba(99,102,241,0.18) 0%, transparent 60%),
                                radial-gradient(ellipse 60% 50% at 80% 70%, rgba(168,85,247,0.14) 0%, transparent 55%),
                                radial-gradient(ellipse 50% 40% at 50% 10%, rgba(59,130,246,0.1) 0%, transparent 50%),
                                linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%);
                }

                /* Floating orbs */
                .ns-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.5;
                    animation: orbFloat 8s ease-in-out infinite;
                }
                .ns-orb-1 {
                    width: 400px; height: 400px;
                    background: radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%);
                    top: -100px; left: -100px;
                    animation-delay: 0s;
                }
                .ns-orb-2 {
                    width: 300px; height: 300px;
                    background: radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%);
                    bottom: -80px; right: -80px;
                    animation-delay: -3s;
                }
                .ns-orb-3 {
                    width: 200px; height: 200px;
                    background: radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%);
                    top: 50%; right: 20%;
                    animation-delay: -5s;
                }

                @keyframes orbFloat {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33%       { transform: translate(30px, -20px) scale(1.05); }
                    66%       { transform: translate(-20px, 15px) scale(0.97); }
                }

                /* Grid lines */
                .ns-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
                    background-size: 60px 60px;
                    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
                }

                /* ── Layout ── */
                .ns-container {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem 1rem;
                }

                .ns-panel {
                    width: 100%;
                    max-width: 460px;
                    animation: panelIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
                }

                @keyframes panelIn {
                    from { opacity: 0; transform: translateY(40px) scale(0.96); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }

                /* ── Brand header ── */
                .ns-brand {
                    text-align: center;
                    margin-bottom: 2.5rem;
                    animation: brandIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both;
                }

                @keyframes brandIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .ns-logo-ring {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 90px;
                    height: 90px;
                    border-radius: 24px;
                    background: rgba(255,255,255,0.06);
                    margin-bottom: 1.25rem;
                    box-shadow: 0 0 0 1px rgba(99,102,241,0.25), 0 8px 32px rgba(99,102,241,0.3);
                    position: relative;
                    animation: logoGlow 3s ease-in-out infinite;
                    padding: 10px;
                    backdrop-filter: blur(10px);
                }

                @keyframes logoGlow {
                    0%, 100% { box-shadow: 0 0 0 1px rgba(99,102,241,0.25), 0 8px 32px rgba(99,102,241,0.3); }
                    50%       { box-shadow: 0 0 0 1px rgba(168,85,247,0.45), 0 8px 48px rgba(168,85,247,0.5); }
                }

                .ns-logo-ring img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 14px;
                }

                .ns-name {
                    font-family: 'Playfair Display', serif;
                    font-size: 2.1rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #e2e8f0 0%, #a5b4fc 50%, #c084fc 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    letter-spacing: -0.02em;
                    line-height: 1.1;
                    margin-bottom: 0.4rem;
                }

                .ns-tagline {
                    color: rgba(148,163,184,0.8);
                    font-size: 0.85rem;
                    font-weight: 400;
                    letter-spacing: 0.04em;
                }

                .ns-tagline span {
                    display: inline-block;
                    width: 20px;
                    height: 1px;
                    background: rgba(99,102,241,0.6);
                    vertical-align: middle;
                    margin: 0 8px;
                }

                /* ── Card ── */
                .ns-card {
                    background: rgba(15,15,30,0.8);
                    border: 1px solid rgba(99,102,241,0.2);
                    border-radius: 24px;
                    padding: 2.5rem;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow:
                        0 0 0 1px rgba(255,255,255,0.04) inset,
                        0 32px 64px rgba(0,0,0,0.5),
                        0 0 80px rgba(99,102,241,0.08);
                    animation: cardIn 0.65s cubic-bezier(0.22,1,0.36,1) 0.15s both;
                }

                @keyframes cardIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* ── Form elements ── */
                .ns-field {
                    margin-bottom: 1.4rem;
                }

                .ns-label {
                    display: block;
                    font-size: 0.7rem;
                    font-weight: 600;
                    color: rgba(148,163,184,0.9);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 0.6rem;
                }

                .ns-input-wrap {
                    position: relative;
                }

                .ns-input-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: rgba(99,102,241,0.6);
                    pointer-events: none;
                    display: flex;
                }

                .ns-input-icon svg {
                    width: 16px;
                    height: 16px;
                    stroke: currentColor;
                    fill: none;
                    stroke-width: 2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }

                .ns-input {
                    width: 100%;
                    padding: 0.8rem 1rem 0.8rem 2.75rem;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(99,102,241,0.2);
                    border-radius: 12px;
                    color: #e2e8f0;
                    font-size: 0.9rem;
                    font-family: 'Inter', sans-serif;
                    outline: none;
                    transition: all 0.2s ease;
                }

                .ns-input::placeholder { color: rgba(148,163,184,0.4); }

                .ns-input:focus {
                    border-color: rgba(99,102,241,0.6);
                    background: rgba(99,102,241,0.06);
                    box-shadow: 0 0 0 3px rgba(99,102,241,0.12), 0 0 20px rgba(99,102,241,0.08);
                }

                .ns-input.has-error {
                    border-color: rgba(239,68,68,0.6);
                    box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
                }

                .ns-pass-toggle {
                    position: absolute;
                    right: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: rgba(148,163,184,0.5);
                    display: flex;
                    padding: 2px;
                    transition: color 0.2s;
                }
                .ns-pass-toggle:hover { color: rgba(99,102,241,0.8); }
                .ns-pass-toggle svg {
                    width: 16px; height: 16px;
                    stroke: currentColor; fill: none;
                    stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
                }

                .ns-error {
                    color: #f87171;
                    font-size: 0.76rem;
                    margin-top: 0.4rem;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                /* ── Remember row ── */
                .ns-remember {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    margin-bottom: 1.75rem;
                }

                .ns-checkbox {
                    appearance: none;
                    -webkit-appearance: none;
                    width: 18px;
                    height: 18px;
                    border: 1.5px solid rgba(99,102,241,0.4);
                    border-radius: 5px;
                    background: rgba(255,255,255,0.04);
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }
                .ns-checkbox:checked {
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border-color: #6366f1;
                }
                .ns-checkbox:checked::after {
                    content: '';
                    position: absolute;
                    left: 4px; top: 1px;
                    width: 6px; height: 10px;
                    border: 2px solid #fff;
                    border-top: none; border-left: none;
                    transform: rotate(45deg);
                }

                .ns-remember-label {
                    color: rgba(148,163,184,0.8);
                    font-size: 0.85rem;
                    cursor: pointer;
                    user-select: none;
                }

                /* ── Submit button ── */
                .ns-btn {
                    width: 100%;
                    padding: 0.9rem;
                    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
                    color: #fff;
                    border: none;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    font-family: 'Inter', sans-serif;
                    cursor: pointer;
                    letter-spacing: 0.04em;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.25s ease;
                    box-shadow: 0 4px 20px rgba(99,102,241,0.4);
                }

                .ns-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
                    opacity: 0;
                    transition: opacity 0.2s;
                }

                .ns-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 32px rgba(99,102,241,0.55);
                }
                .ns-btn:hover:not(:disabled)::before { opacity: 1; }
                .ns-btn:active:not(:disabled) { transform: translateY(0); }
                .ns-btn:disabled { opacity: 0.55; cursor: not-allowed; }

                .ns-btn-inner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .ns-spinner {
                    width: 16px; height: 16px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* ── Divider ── */
                .ns-divider {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 1.75rem 0;
                }
                .ns-divider-line {
                    flex: 1;
                    height: 1px;
                    background: rgba(99,102,241,0.15);
                }
                .ns-divider-text {
                    color: rgba(148,163,184,0.4);
                    font-size: 0.72rem;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }

                /* ── Footer ── */
                .ns-footer {
                    text-align: center;
                    margin-top: 2rem;
                    color: rgba(100,116,139,0.6);
                    font-size: 0.75rem;
                    letter-spacing: 0.03em;
                    animation: brandIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s both;
                }

                .ns-footer-dot {
                    display: inline-block;
                    width: 4px; height: 4px;
                    border-radius: 50%;
                    background: rgba(99,102,241,0.5);
                    vertical-align: middle;
                    margin: 0 8px;
                }

                /* ── Particles ── */
                .ns-particles {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                    overflow: hidden;
                }
                .ns-particle {
                    position: absolute;
                    width: 2px; height: 2px;
                    border-radius: 50%;
                    background: rgba(99,102,241,0.6);
                    animation: particleFloat linear infinite;
                }
                @keyframes particleFloat {
                    0%   { transform: translateY(100vh) translateX(0); opacity: 0; }
                    10%  { opacity: 1; }
                    90%  { opacity: 1; }
                    100% { transform: translateY(-10vh) translateX(30px); opacity: 0; }
                }
            `}</style>

            {/* Background */}
            <div className="ns-bg">
                <div className="ns-orb ns-orb-1" />
                <div className="ns-orb ns-orb-2" />
                <div className="ns-orb ns-orb-3" />
                <div className="ns-grid" />
            </div>

            {/* Floating particles */}
            <div className="ns-particles">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="ns-particle" style={{
                        left: `${8 + i * 8}%`,
                        animationDuration: `${6 + (i % 5) * 2}s`,
                        animationDelay: `${i * 0.8}s`,
                        width: i % 3 === 0 ? '3px' : '2px',
                        height: i % 3 === 0 ? '3px' : '2px',
                        background: i % 2 === 0 ? 'rgba(99,102,241,0.7)' : 'rgba(168,85,247,0.6)',
                    }} />
                ))}
            </div>

            <div className="ns-container">
                <div className="ns-panel">

                    {/* Brand */}
                    <div className="ns-brand">
                        <div className="ns-logo-ring">
                            <img
                                src="https://www.thenikhilsharma.in/public/admin/images/logo/GUJKF-100621-yYB.png"
                                alt="Nikhil Sharma Logo"
                            />
                        </div>
                        <div className="ns-name">Nikhil Sharma</div>
                        <div className="ns-tagline">
                            <span />
                            Admin Dashboard
                            <span />
                        </div>
                    </div>

                    {/* Card */}
                    <div className="ns-card">
                        <form onSubmit={handleSubmit} noValidate>

                            {/* Email */}
                            <div className="ns-field">
                                <label className="ns-label">Email Address</label>
                                <div className="ns-input-wrap">
                                    <span className="ns-input-icon">
                                        <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    </span>
                                    <input
                                        type="email"
                                        className={`ns-input${errors.email ? ' has-error' : ''}`}
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="your@email.com"
                                        autoComplete="email"
                                    />
                                </div>
                                {errors.email && <p className="ns-error">⚠ {errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="ns-field">
                                <label className="ns-label">Password</label>
                                <div className="ns-input-wrap">
                                    <span className="ns-input-icon">
                                        <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                    </span>
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        className={`ns-input${errors.password ? ' has-error' : ''}`}
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        style={{ paddingRight: '2.75rem' }}
                                    />
                                    <button
                                        type="button"
                                        className="ns-pass-toggle"
                                        onClick={() => setShowPass(v => !v)}
                                        tabIndex={-1}
                                        aria-label={showPass ? 'Hide password' : 'Show password'}
                                    >
                                        {showPass ? (
                                            <svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="ns-error">⚠ {errors.password}</p>}
                            </div>

                            {/* Remember */}
                            <div className="ns-remember">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="ns-checkbox"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                />
                                <label htmlFor="remember" className="ns-remember-label">Keep me signed in</label>
                            </div>

                            {/* Submit */}
                            <button type="submit" className="ns-btn" disabled={processing}>
                                <span className="ns-btn-inner">
                                    {processing ? (
                                        <>
                                            <span className="ns-spinner" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                                                <polyline points="10 17 15 12 10 7"/>
                                                <line x1="15" y1="12" x2="3" y2="12"/>
                                            </svg>
                                            Sign In to Dashboard
                                        </>
                                    )}
                                </span>
                            </button>

                        </form>
                    </div>

                    {/* Footer */}
                    <div className="ns-footer">
                        <span>Nikhil Sharma</span>
                        <span className="ns-footer-dot" />
                        <span>Admin Panel</span>
                        <span className="ns-footer-dot" />
                        <span>© {new Date().getFullYear()}</span>
                    </div>

                </div>
            </div>
        </div>
    );
}
