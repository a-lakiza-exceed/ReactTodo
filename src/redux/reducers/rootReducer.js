import { combineReducers } from "redux";
import { todosReducer } from "redux/reducers/todosReducer";
import { filterReducer } from "redux/reducers/filterReducer";
import { authReducer } from "redux/reducers/authReducer";

export const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  auth: authReducer
});
