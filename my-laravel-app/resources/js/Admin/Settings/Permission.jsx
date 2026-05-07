import AdminLayout from '../layouts/AdminLayout';

export default function AdminSettingsPermission({ permissions }) {
    return (
        <AdminLayout title="Permissions">
            <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 8px 24px rgba(15,23,42,0.06)' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Permissions</h1>
                    <p style={{ color: '#475569', marginTop: '0.5rem' }}>Displaying permissions directly from the database.</p>
                </div>

                {permissions && permissions.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', borderBottom: '2px solid #e2e8f0', color: '#0f172a' }}>ID</th>
                                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', borderBottom: '2px solid #e2e8f0', color: '#0f172a' }}>Name</th>
                                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', borderBottom: '2px solid #e2e8f0', color: '#0f172a' }}>Guard</th>
                                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', borderBottom: '2px solid #e2e8f0', color: '#0f172a' }}>Created</th>
                                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', borderBottom: '2px solid #e2e8f0', color: '#0f172a' }}>Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {permissions.map((permission) => (
                                    <tr key={permission.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>{permission.id}</td>
                                        <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>{permission.name}</td>
                                        <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>{permission.guard_name || 'web'}</td>
                                        <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>{permission.created_at || 'N/A'}</td>
                                        <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>{permission.updated_at || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ padding: '1.25rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem', background: '#f8fafc' }}>
                        <p style={{ margin: 0, color: '#334155' }}>No permissions found in the database yet.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
