import { apiClient } from './apiClient';

function buildQueryString(params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, value);
        }
    });
    const query = searchParams.toString();
    return query ? `?${query}` : '';
}

export function fetchLogs(params) {
    return apiClient.get(`/audit-logs${buildQueryString(params)}`);
}

export function fetchFilterOptions() {
    return apiClient.get('/audit-logs/filters');
}

export function uploadLogs(logs) {
    return apiClient.post('/audit-logs/bulk-upload', { logs });
}
