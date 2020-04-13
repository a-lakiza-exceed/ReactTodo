import axios from "axios";
import { toast } from "react-toastify";
import {
  ADD_TODO,
  LOAD_DATA,
  REMOVE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  CLEAR_COMPLETED,
  COMPLETE_ALL_TODOS
} from "../types/actionTypes";

export function addTodo(text, userId) {
  return function (dispatch) {
    axios
      .post(`http://localhost:2000/todos/create/`, {
        text,
        isCompleted: false,
        userId
      })
      .then(res => {
        dispatch({
          type: ADD_TODO,
          payload: res.data
        });
        toast.success(`Added todo: ${text}`);
      })
      .catch(err => toast.error(`${err}`));
  };
}

export function loadData(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:2000/todos/${id}`,  )
      .then(res => {
        const todos = [...res.data].reverse();
        dispatch({
          type: LOAD_DATA,
          payload: todos
        });
      })
      .catch(err => toast.error(`${err}`));
  };
}

export function removeTodo(id, text) {
  return function (dispatch) {
    axios
      .delete(`http://localhost:2000/todos/${id}/delete`)
      .then(() => {
        dispatch({
          type: REMOVE_TODO,
          payload: id
        });
        toast.info(`Removed: ${text}`);
      })
      .catch(err => toast.error(`${err}`));
  };
}

export function editTodo(id, text) {
  return function (dispatch) {
    axios
      .put(`http://localhost:2000/todos/${id}/update`, {
        text: text
      })
      .then(() => {
        dispatch({
          type: EDIT_TODO,
          payload: {
            id,
            text
          }
        });
      })
      .catch(err => toast.error(`${err}`));
  };
}

export function completeTodo({ _id, isCompleted }) {
  return function (dispatch) {
    axios
      .put(`http://localhost:2000/todos/${_id}/update`, {
        isCompleted: !isCompleted
      })
      .then(() => {
        dispatch({
          type: COMPLETE_TODO,
          payload: _id
        });
      })
      .catch(err => toast.error(`${err}`));
  };
}

export function completeAllTodos(areAllChecked) {
  return function (dispatch) {
    axios
      .put(`http://localhost:2000/todos/updateMany`, {
        isCompleted: areAllChecked
      })
      .then(() => {
        dispatch({
          type: COMPLETE_ALL_TODOS
        });
      })
      .catch(err => toast.error(`${err}`));
  };
}

export function clearCompleted() {
  return function (dispatch) {
    axios
      .delete(`http://localhost:2000/todos/deleteCompleted/`)
      .then(() => {
        dispatch({
          type: CLEAR_COMPLETED
        });
      })
      .catch(err => toast.error(`${err}`));
  };
}
