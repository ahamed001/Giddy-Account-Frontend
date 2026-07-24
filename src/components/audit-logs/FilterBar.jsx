import { FILTER_FIELDS } from '../../utils/constants';

export default function FilterBar({ filters, filterOptions, onFilterChange, onReset }) {
    return (
        <div className="filter-bar">
            {FILTER_FIELDS.map(({ field, label, optionsKey }) => {
                if (!optionsKey) {
                    return (
                        <div className="filter-field" key={field}>
                            <label htmlFor={`filter-${field}`}>{label}</label>
                            <input
                                id={`filter-${field}`}
                                type="text"
                                value={filters[field]}
                                placeholder={`Filter by ${label.toLowerCase()}`}
                                onChange={(event) => onFilterChange(field, event.target.value)}
                            />
                        </div>
                    );
                }

                const options = filterOptions[optionsKey] || [];
                return (
                    <div className="filter-field" key={field}>
                        <label htmlFor={`filter-${field}`}>{label}</label>
                        <select
                            id={`filter-${field}`}
                            value={filters[field]}
                            onChange={(event) => onFilterChange(field, event.target.value)}
                        >
                            <option value="">All</option>
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            })}

            <button type="button" className="btn btn--ghost" onClick={onReset}>
                Clear filters
            </button>
        </div>
    );
}
