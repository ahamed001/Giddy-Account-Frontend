import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../layouts/DashboardLayout';
import SearchBar from '../components/audit-logs/SearchBar';
import FilterBar from '../components/audit-logs/FilterBar';
import SortControl from '../components/audit-logs/SortControl';
import LogsTable from '../components/audit-logs/LogsTable';
import Pagination from '../components/audit-logs/Pagination';
import UploadLogsButton from '../components/audit-logs/UploadLogsButton';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import { useDebounce } from '../hooks/useDebounce';
import {
    setSearch,
    setFilter,
    resetFilters,
    setSort,
    setPage,
    setLimit,
} from '../redux/slices/auditLogSlice';
import { fetchLogs, fetchFilterOptions } from '../redux/thunks/auditLogThunks';

export default function AuditLogsPage() {
    const dispatch = useDispatch();
    const {
        logs, pagination, filters, search, sortBy, sortOrder, filterOptions, status, error,
    } = useSelector((state) => state.auditLogs);

    const [searchInput, setSearchInput] = useState(search);
    const debouncedSearch = useDebounce(searchInput, 400);

    useEffect(() => {
        dispatch(fetchFilterOptions());
    }, [dispatch]);

    useEffect(() => {
        if (debouncedSearch !== search) {
            dispatch(setSearch(debouncedSearch));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    useEffect(() => {
        dispatch(fetchLogs());
    }, [dispatch, filters, search, sortBy, sortOrder, pagination.page, pagination.limit]);

    const handleFilterChange = (field, value) => dispatch(setFilter({ field, value }));
    const handleReset = () => {
        setSearchInput('');
        dispatch(resetFilters());
    };
    const handleSortChange = (field, order) => dispatch(setSort({ sortBy: field, sortOrder: order }));

    return (
        <DashboardLayout>
            <section className="toolbar">
                <SearchBar value={searchInput} onChange={setSearchInput} />
                <UploadLogsButton />
            </section>

            <section className="toolbar toolbar--secondary">
                <FilterBar
                    filters={filters}
                    filterOptions={filterOptions}
                    onFilterChange={handleFilterChange}
                    onReset={handleReset}
                />
                <SortControl sortBy={sortBy} sortOrder={sortOrder} onSortChange={handleSortChange} />
            </section>

            <section className="logs-panel">
                {status === 'loading' && <LoadingState label="Loading audit logs..." />}

                {status === 'failed' && (
                    <ErrorState message={error} onRetry={() => dispatch(fetchLogs())} />
                )}

                {status === 'succeeded' && logs.length === 0 && (
                    <EmptyState message="No audit logs match your search and filters." />
                )}

                {status === 'succeeded' && logs.length > 0 && (
                    <>
                        <LogsTable logs={logs} />
                        <Pagination
                            pagination={pagination}
                            onPageChange={(page) => dispatch(setPage(page))}
                            onLimitChange={(limit) => dispatch(setLimit(limit))}
                        />
                    </>
                )}
            </section>
        </DashboardLayout>
    );
}
