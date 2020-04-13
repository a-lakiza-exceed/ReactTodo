import {
  ADD_TODO,
  LOAD_DATA,
  REMOVE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED
} from "../types/actionTypes";

const initialState = {
  todos: [],
  areAllCompleted: false
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        todos: [...action.payload],
        areAllCompleted:
          [...action.payload].every(todo => todo.isCompleted) &&
          action.payload.length !== 0
      };

    case ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        areAllCompleted: false
      };

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload),
        areAllCompleted: state.todos.length > 1 ? state.areAllCompleted : false
      };

    case EDIT_TODO:
      const newTodos = [...state.todos].map(todo => {
        const newTodo = {
          ...(todo._id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo)
        };
        return newTodo;
      });
      return { ...state, todos: newTodos };

    case COMPLETE_TODO:
      const todos = [...state.todos].map(todo => {
        const newTodo = {
          ...(todo._id === action.payload
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo)
        };
        return newTodo;
      });
      return {
        ...state,
        todos: todos,
        areAllCompleted:
          [...todos].every(todo => todo.isCompleted) && todos.length !== 0
      };

    case COMPLETE_ALL_TODOS:
      const areAllCompleted = [...state.todos].every(todo => todo.isCompleted);
      return {
        ...state,
        todos: [...state.todos].map(todo => ({
          ...todo,
          isCompleted: !areAllCompleted
        })),
        areAllCompleted: !areAllCompleted
      };

    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: [...state.todos].filter(todo => !todo.isCompleted),
        areAllCompleted: false
      };

    default:
      return state;
  }
};
