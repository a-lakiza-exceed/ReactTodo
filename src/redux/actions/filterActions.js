import { SET_VISIBILITY_FILTER } from "redux/types/actionTypes";

export function setFilter(tab) {
    return {
      type: SET_VISIBILITY_FILTER,
      payload: tab
    }
  }