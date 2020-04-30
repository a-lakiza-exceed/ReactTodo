import { createReducer } from '@reduxjs/toolkit'
import {
  add_todo,
  load_data,
  remove_todo,
  edit_todo,
  complete_todo,
  clear_completed,
  complete_all_todos
} from "redux/actions/todoActions";

const initialState = {
  todos: [],
  areAllCompleted: false
};

export const todosReducer = createReducer(initialState, {
  [add_todo]: (state, action) => {
    state.areAllCompleted = false
    state.todos.unshift(action.payload)
  },

  [load_data]: (state, action) => {
    state.areAllCompleted = [...action.payload].every(todo => todo.isCompleted) && action.payload.length !== 0
    state.todos = action.payload
  },

  [remove_todo]: (state, action) => {
    state.areAllCompleted = state.todos.length > 1 ? state.areAllCompleted : false
    state.todos = state.todos.filter(todo => todo._id !== action.payload)
  },

  [edit_todo]: (state, action) => {
    state.todos = state.todos.map(todo => {
      const newTodo = {
        ...(todo._id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo)
      };
      return newTodo;
    });
  },

  [complete_todo]: (state, action) => {
    const todos = state.todos.map(todo => {
      const newTodo = {
        ...(todo._id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo)
      };
      return newTodo;
    });
    state.todos = todos
    state.areAllCompleted = [...todos].every(todo => todo.isCompleted) && todos.length !== 0
  },

  [complete_all_todos]: (state, action) => {
    const areAllCompleted = [...state.todos].every(todo => todo.isCompleted);
    state.todos = [...state.todos].map(todo => ({
      ...todo,
      isCompleted: !areAllCompleted
    }))
    state.areAllCompleted = !state.areAllCompleted
  },

  [clear_completed]: (state, action) => {
    state.todos = state.todos.filter(todo => !todo.isCompleted)
    state.areAllCompleted = false
  },
})

