export const SEVERITY_LEVELS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export const SORT_FIELDS = [
    { value: 'timestamp', label: 'Timestamp' },
    { value: 'actor', label: 'Actor' },
    { value: 'severity', label: 'Severity' },
];

export const FILTER_FIELDS = [
    { field: 'actor', label: 'Actor', optionsKey: null },
    { field: 'role', label: 'Role', optionsKey: 'roles' },
    { field: 'action', label: 'Action', optionsKey: 'actions' },
    { field: 'resourceType', label: 'Resource Type', optionsKey: 'resourceTypes' },
    { field: 'severity', label: 'Severity', optionsKey: 'severities' },
    { field: 'status', label: 'Status', optionsKey: 'statuses' },
    { field: 'region', label: 'Region', optionsKey: 'regions' },
];

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
