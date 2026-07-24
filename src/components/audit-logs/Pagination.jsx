import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { PAGE_SIZE_OPTIONS } from '../../utils/constants';

export default function Pagination({ pagination, onPageChange, onLimitChange }) {
    const { page, pages, total, limit } = pagination;
    const rangeStart = total === 0 ? 0 : (page - 1) * limit + 1;
    const rangeEnd = Math.min(page * limit, total);

    return (
        <div className="pagination">
            <span className="pagination__summary">
                {total === 0 ? 'No records' : `Showing ${rangeStart}–${rangeEnd} of ${total}`}
            </span>

            <div className="pagination__controls">
                <button
                    type="button"
                    className="btn btn--icon"
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    aria-label="Previous page"
                >
                    <FiChevronLeft />
                </button>
                <span className="pagination__page">
                    Page {page} of {pages}
                </span>
                <button
                    type="button"
                    className="btn btn--icon"
                    disabled={page >= pages}
                    onClick={() => onPageChange(page + 1)}
                    aria-label="Next page"
                >
                    <FiChevronRight />
                </button>
            </div>

            <select
                className="pagination__limit"
                value={limit}
                onChange={(event) => onLimitChange(Number(event.target.value))}
                aria-label="Rows per page"
            >
                {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                        {size} / page
                    </option>
                ))}
            </select>
        </div>
    );
}
