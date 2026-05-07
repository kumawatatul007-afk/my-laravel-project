import { useForm } from '@inertiajs/react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", padding: '1rem' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                * { box-sizing: border-box; }

                .login-wrapper {
                    width: 100%;
                    max-width: 420px;
                }

                .login-brand {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .login-brand-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #2563eb;
                    display: inline-block;
                    margin-bottom: 1rem;
                }

                .login-card {
                    background: #ffffff;
                    border-radius: 16px;
                    padding: 2.5rem;
                    width: 100%;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
                    border: 1px solid #e2e8f0;
                }

                .login-label {
                    display: block;
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    margin-bottom: 0.5rem;
                }

                .login-input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    color: #0f172a;
                    font-size: 0.9rem;
                    outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s;
                }

                .login-input:focus {
                    border-color: #3b82f6;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
                }

                .login-input.error { border-color: #ef4444; }
                .login-error { color: #ef4444; font-size: 0.78rem; margin-top: 0.35rem; }

                .login-btn {
                    width: 100%;
                    padding: 0.875rem;
                    background: #2563eb;
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background 0.15s;
                    margin-top: 0.5rem;
                    letter-spacing: 0.02em;
                }

                .login-btn:hover:not(:disabled) { background: #1d4ed8; }
                .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }

                .divider {
                    height: 1px;
                    background: #f1f5f9;
                    margin: 1.5rem 0;
                }

                /* ── Login animations ── */
                @keyframes loginFadeIn {
                    from { opacity: 0; transform: translateY(24px) scale(0.98); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes brandIn {
                    from { opacity: 0; transform: translateY(-12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes dotPulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
                    50%       { transform: scale(1.15); box-shadow: 0 0 0 8px rgba(37,99,235,0); }
                }
                .login-brand { animation: brandIn 0.4s cubic-bezier(0.22,1,0.36,1) both; }
                .login-brand-dot { animation: dotPulse 2.5s ease-in-out infinite; }
                .login-card {
                    animation: loginFadeIn 0.45s cubic-bezier(0.22,1,0.36,1) 0.1s both;
                }
                .login-btn {
                    transition: background 0.18s, transform 0.18s, box-shadow 0.18s !important;
                }
                .login-btn:hover:not(:disabled) {
                    background: #1d4ed8 !important;
                    transform: translateY(-1px) !important;
                    box-shadow: 0 6px 16px rgba(37,99,235,0.3) !important;
                }
            `}</style>

            <div className="login-wrapper">
                <div className="login-brand">
                    <div className="login-brand-dot"></div>
                    <h1 style={{ color: '#0f172a', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>Mora Admin</h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Sign in to your admin panel</p>
                </div>

                <div className="login-card">
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label className="login-label">Email Address</label>
                            <input
                                type="email"
                                className={`login-input${errors.email ? ' error' : ''}`}
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="admin@example.com"
                                autoComplete="email"
                            />
                            {errors.email && <p className="login-error">{errors.email}</p>}
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label className="login-label">Password</label>
                            <input
                                type="password"
                                className={`login-input${errors.password ? ' error' : ''}`}
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                            />
                            {errors.password && <p className="login-error">{errors.password}</p>}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <input
                                type="checkbox"
                                id="remember"
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                style={{ accentColor: '#2563eb', width: 15, height: 15 }}
                            />
                            <label htmlFor="remember" style={{ color: '#64748b', fontSize: '0.875rem', cursor: 'pointer', fontWeight: 500 }}>Remember me</label>
                        </div>

                        <button type="submit" className="login-btn" disabled={processing}>
                            {processing ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                    Mora Admin Panel &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
}
