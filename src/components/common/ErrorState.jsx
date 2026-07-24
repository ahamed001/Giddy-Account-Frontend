import { FiAlertTriangle } from 'react-icons/fi';

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
    return (
        <div className="state-panel state-panel--error">
            <FiAlertTriangle size={32} aria-hidden="true" />
            <p>{message}</p>
            {onRetry && (
                <button type="button" className="btn btn--secondary" onClick={onRetry}>
                    Retry
                </button>
            )}
        </div>
    );
}
