import { createReducer } from '@reduxjs/toolkit'
import {
    setCurrentUser
} from "redux/actions/authActions";

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export const authReducer = createReducer(initialState, {
    [setCurrentUser]: (state, action) => {
        state.isAuthenticated = !(Object.keys(action.payload).length === 0)
        state.user = action.payload
    }
})