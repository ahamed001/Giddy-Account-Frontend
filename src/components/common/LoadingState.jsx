export default function LoadingState({ label = 'Loading...' }) {
    return (
        <div className="state-panel state-panel--loading">
            <span className="spinner" aria-hidden="true" />
            <p>{label}</p>
        </div>
    );
}
