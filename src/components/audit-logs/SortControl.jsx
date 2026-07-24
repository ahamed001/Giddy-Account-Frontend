import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { SORT_FIELDS } from '../../utils/constants';

export default function SortControl({ sortBy, sortOrder, onSortChange }) {
    return (
        <div className="sort-control">
            <label htmlFor="sort-by">Sort by</label>
            <select
                id="sort-by"
                value={sortBy}
                onChange={(event) => onSortChange(event.target.value, sortOrder)}
            >
                {SORT_FIELDS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <button
                type="button"
                className="btn btn--icon"
                title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
            >
                {sortOrder === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
            </button>
        </div>
    );
}
