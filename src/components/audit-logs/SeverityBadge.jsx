const SEVERITY_CLASS = {
    LOW: 'badge badge--low',
    MEDIUM: 'badge badge--medium',
    HIGH: 'badge badge--high',
    CRITICAL: 'badge badge--critical',
};

export default function SeverityBadge({ severity }) {
    const key = String(severity || '').toUpperCase();
    return <span className={SEVERITY_CLASS[key] || 'badge'}>{key || 'UNKNOWN'}</span>;
}
