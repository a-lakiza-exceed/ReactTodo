import axios from "axios";

export const register = (data) => {
    return axios
        .post(process.env.REACT_APP_REGISTER, data)
}

export const login = (data) => {
    return axios
        .post(process.env.REACT_APP_LOGIN, data)
}

export const createTodo = (text, userId) => {
    return axios
        .post(process.env.REACT_APP_TODOS, {
            text,
            isCompleted: false,
            userId
        })
}

export const loadTodos = (id) => {
    return axios
        .get(`${process.env.REACT_APP_TODOS}/${id}`)
} 

export const deleteTodo = (id) => {
    return axios
        .delete(`${process.env.REACT_APP_TODOS}/${id}`)
} 

export const editTodo = (id, text) => {
    return axios
    .put(`${process.env.REACT_APP_TODOS}/${id}`, {
        text
      })
} 

export const completeTodo = (id, isCompleted) => {
    return axios
    .put(`${process.env.REACT_APP_TODOS}/${id}`, {
        isCompleted
      })
} 

export const completeAllTodos = (isCompleted) => {
    return axios
    .put(process.env.REACT_APP_TODOS, {
        isCompleted
      })
} 

export const clearCompleted = () => {
    return axios
    .delete(process.env.REACT_APP_TODOS,)
} 
