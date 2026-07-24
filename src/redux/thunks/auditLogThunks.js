import { createAsyncThunk } from '@reduxjs/toolkit';
import * as auditLogService from '../../services/auditLogService';

export const fetchLogs = createAsyncThunk(
    'auditLogs/fetchLogs',
    async (_, { getState, rejectWithValue }) => {
        const { filters, search, sortBy, sortOrder, pagination } = getState().auditLogs;
        try {
            const response = await auditLogService.fetchLogs({
                ...filters,
                search,
                sortBy,
                sortOrder,
                page: pagination.page,
                limit: pagination.limit,
            });
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchFilterOptions = createAsyncThunk(
    'auditLogs/fetchFilterOptions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await auditLogService.fetchFilterOptions();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const uploadLogs = createAsyncThunk(
    'auditLogs/uploadLogs',
    async (logs, { dispatch, rejectWithValue }) => {
        try {
            const response = await auditLogService.uploadLogs(logs);
            dispatch(fetchLogs());
            dispatch(fetchFilterOptions());
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
