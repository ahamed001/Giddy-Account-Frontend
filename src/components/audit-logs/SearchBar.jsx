import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ value, onChange }) {
    return (
        <div className="search-bar">
            <FiSearch className="search-bar__icon" aria-hidden="true" />
            <input
                type="text"
                className="search-bar__input"
                placeholder="Search by actor, resource or IP address..."
                value={value}
                onChange={(event) => onChange(event.target.value)}
                aria-label="Search audit logs"
            />
        </div>
    );
}
