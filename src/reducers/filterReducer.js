import { SET_VISIBILITY_FILTER } from "../types/actionTypes";

const initialState = {
  activeTab: null
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return {...state, activeTab: action.payload};
    default:
      return state;
  }
};
