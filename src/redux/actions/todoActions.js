import { createAction } from '@reduxjs/toolkit'
import { toast } from "react-toastify";
import * as API from 'utils/API'
import {
  ADD_TODO,
  LOAD_DATA,
  REMOVE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  CLEAR_COMPLETED,
  COMPLETE_ALL_TODOS
} from "redux/types/actionTypes";

export const add_todo = createAction(ADD_TODO)

export const load_data = createAction(LOAD_DATA)

export const remove_todo = createAction(REMOVE_TODO)

export const edit_todo = createAction(EDIT_TODO)

export const complete_todo = createAction(COMPLETE_TODO)

export const clear_completed = createAction(CLEAR_COMPLETED)

export const complete_all_todos = createAction(COMPLETE_ALL_TODOS)

export function addTodo(text, userId) {
  return function (dispatch) {
    API.createTodo(text, userId)
      .then(res => {
        dispatch(add_todo(res.data));
        toast.success(`Added todo: ${text}`);
      })
      .catch(err => toast.error(`${err}`));
  };
}

export function loadData(id) {
  return function (dispatch) {
    API.loadTodos(id)
      .then(res => {
        const todos = [...res.data].reverse();
        dispatch(load_data(todos));
      })
      .catch(err => toast.error(`${err}`));
  };
}

export function removeTodo(id, text) {
  return function (dispatch) {
    API.deleteTodo(id)
      .then(() => {
        dispatch(remove_todo(id));
        toast.info(`Removed: ${text}`);
      })
      .catch(err => toast.error(`${err}`));
  };
}

export function editTodo(id, text) {
  return function (dispatch) {
    API.editTodo(id, text)
      .then(() => {
        dispatch(edit_todo({
          id,
          text
        })
        );
      })
      .catch(err => toast.error(`${err}`));
  };
}

export function completeTodo({ _id, isCompleted }) {
  return function (dispatch) {
    API.completeTodo(_id, !isCompleted)
      .then(() => {
        dispatch(complete_todo(_id));
      })
      .catch(err => toast.error(`${err}`));
  };
}

export function completeAllTodos(isCompleted) {
  return function (dispatch) {
    API.completeAllTodos(isCompleted)
      .then(() => {
        dispatch(complete_all_todos());
      })
      .catch(err => toast.error(`${err}`));
  };
}

export function clearCompleted() {
  return function (dispatch) {
    API.clearCompleted()
      .then(() => {
        dispatch(clear_completed());
      })
      .catch(err => toast.error(`${err}`));
  };
}
