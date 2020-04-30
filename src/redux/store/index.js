import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from "redux/reducers/rootReducer";

const middleware = getDefaultMiddleware({
    thunk: true,
});

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store