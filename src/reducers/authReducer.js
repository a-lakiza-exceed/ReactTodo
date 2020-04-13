import {
    SET_CURRENT_USER,
    USER_LOADING
} from "../types/actionTypes";
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:    
            return {
                ...state,
                isAuthenticated: !(Object.keys(action.payload).length === 0),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}