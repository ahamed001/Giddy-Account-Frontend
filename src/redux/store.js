import { configureStore } from '@reduxjs/toolkit';
import auditLogReducer from './slices/auditLogSlice';

// configureStore wires up redux-thunk by default, so no separate
// redux-thunk dependency is needed for async action creators.
export const store = configureStore({
    reducer: {
        auditLogs: auditLogReducer,
    },
});
