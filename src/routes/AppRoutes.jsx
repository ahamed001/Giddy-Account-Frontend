import { Routes, Route, Navigate } from 'react-router-dom';
import AuditLogsPage from '../pages/AuditLogsPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AuditLogsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
