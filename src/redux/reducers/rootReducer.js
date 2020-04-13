import { combineReducers } from "redux";
import { todosReducer } from "./todosReducer";
import { filterReducer } from "./filterReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  auth: authReducer
});
