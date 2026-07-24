import { createSlice } from '@reduxjs/toolkit';
import { fetchLogs, fetchFilterOptions, uploadLogs } from '../thunks/auditLogThunks';

const initialState = {
    logs: [],
    pagination: { page: 1, limit: 20, total: 0, pages: 1 },
    filters: {
        actor: '',
        role: '',
        action: '',
        resourceType: '',
        severity: '',
        status: '',
        region: '',
    },
    search: '',
    sortBy: 'timestamp',
    sortOrder: 'desc',
    filterOptions: {
        roles: [],
        actions: [],
        resourceTypes: [],
        severities: [],
        statuses: [],
        regions: [],
    },
    status: 'idle',
    error: null,
    upload: {
        status: 'idle',
        stats: null,
        error: null,
    },
};

const auditLogSlice = createSlice({
    name: 'auditLogs',
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
            state.pagination.page = 1;
        },
        setFilter(state, action) {
            const { field, value } = action.payload;
            state.filters[field] = value;
            state.pagination.page = 1;
        },
        resetFilters(state) {
            state.filters = { ...initialState.filters };
            state.search = '';
            state.pagination.page = 1;
        },
        setSort(state, action) {
            const { sortBy, sortOrder } = action.payload;
            state.sortBy = sortBy;
            state.sortOrder = sortOrder;
            state.pagination.page = 1;
        },
        setPage(state, action) {
            state.pagination.page = action.payload;
        },
        setLimit(state, action) {
            state.pagination.limit = action.payload;
            state.pagination.page = 1;
        },
        resetUploadStatus(state) {
            state.upload = { ...initialState.upload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogs.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchLogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.logs = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchLogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch logs';
            })
            .addCase(fetchFilterOptions.fulfilled, (state, action) => {
                state.filterOptions = action.payload;
            })
            .addCase(uploadLogs.pending, (state) => {
                state.upload.status = 'loading';
                state.upload.error = null;
                state.upload.stats = null;
            })
            .addCase(uploadLogs.fulfilled, (state, action) => {
                state.upload.status = 'succeeded';
                state.upload.stats = action.payload;
            })
            .addCase(uploadLogs.rejected, (state, action) => {
                state.upload.status = 'failed';
                state.upload.error = action.payload || 'Upload failed';
            });
    },
});

export const {
    setSearch,
    setFilter,
    resetFilters,
    setSort,
    setPage,
    setLimit,
    resetUploadStatus,
} = auditLogSlice.actions;

export default auditLogSlice.reducer;
