import { SET_VISIBILITY_FILTER } from "../types/actionTypes";
import { SHOW_ALL } from "../types/filterTypes";

const initialState = {
  activeTab: SHOW_ALL
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return {...state, activeTab: action.payload};
    default:
      return state;
  }
};
