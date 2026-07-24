import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ message = 'No logs found.' }) {
    return (
        <div className="state-panel state-panel--empty">
            <FiInbox size={32} aria-hidden="true" />
            <p>{message}</p>
        </div>
    );
}
