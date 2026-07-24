const STATUS_CLASS = {
    resolved: 'badge badge--resolved',
    unresolved: 'badge badge--unresolved',
    'in progress': 'badge badge--in-progress',
};

export default function StatusBadge({ status }) {
    const key = String(status || '').toLowerCase();
    return <span className={STATUS_CLASS[key] || 'badge badge--neutral'}>{status || 'Unknown'}</span>;
}
