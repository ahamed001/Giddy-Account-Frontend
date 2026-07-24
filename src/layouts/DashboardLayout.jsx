import { FiShield } from 'react-icons/fi';

export default function DashboardLayout({ children }) {
    return (
        <div className="dashboard-layout">
            <header className="dashboard-layout__header">
                <FiShield size={22} aria-hidden="true" />
                <h1>Security Audit Logs</h1>
            </header>
            <main className="dashboard-layout__content">{children}</main>
        </div>
    );
}
