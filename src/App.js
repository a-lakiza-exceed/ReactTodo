import React from "react";
import Add from "./components/Add";
import Todos from "./components/Todos";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends React.Component {
  state = {
    todos: [],
    isAllChecked: false,
    activeTab: null
  };

  componentDidMount() {
    axios
      .get(`http://localhost:2000/todos/`)
      .then(res => {
        const todos = [...res.data].reverse();
        this.setState({ todos });
      })
      .then(() => {
        const isAllCompleted =
          [...this.state.todos].every(todo => todo.isCompleted) &&
          this.state.todos.length !== 0;

        this.setState({
          isAllChecked: isAllCompleted
        });
      });
  }

  addNotify = text => toast.success(text);

  removeNotify = text => toast.error(text);

  handleAddTodos = ({ text, isCompleted }) => {
    axios
      .post(`http://localhost:2000/todos/create/`, {
        text,
        isCompleted
      })
      .then(res => {
        const nextTodo = [res.data, ...this.state.todos];
        this.setState({ todos: nextTodo });
        this.addNotify(`Added todo: ${text}`);
      });
  };

  handleEditTodos = (id, text) => {
    axios
      .put(`http://localhost:2000/todos/${id}/update`, {
        text: text
      })
      .then(() => {
        const todos = [...this.state.todos].map(todo => {
          const newTodo = {
            ...(todo._id === id ? { ...todo, text } : todo)
          };
          return newTodo;
        });
        this.setState({
          todos
        });
      });
  };

  handleCheckboxChange = ({ _id, isCompleted }) => {
    axios
      .put(`http://localhost:2000/todos/${_id}/update`, {
        isCompleted: !isCompleted
      })
      .then(() => {
        const todos = [...this.state.todos].map(todo => {
          const newTodo = {
            ...(todo._id === _id
              ? { ...todo, isCompleted: !isCompleted }
              : todo)
          };
          return newTodo;
        });
        const isAllCompleted =
          todos.every(todo => todo.isCompleted) &&
          this.state.todos.length !== 0;
        this.setState({
          todos: todos,
          isAllChecked: isAllCompleted
        });
      });
  };

  handleHeaderCheckboxChange = () => {
    const isAllChecked = !this.state.isAllChecked;
    axios
      .put(`http://localhost:2000/todos/updateMany`, {
        isCompleted: isAllChecked
      })
      .then(() => {
        const todos = [...this.state.todos].map(todo => {
          const newTodo = {
            ...todo,
            isCompleted: isAllChecked
          };
          return newTodo;
        });
        this.setState({
          todos: todos,
          isAllChecked: isAllChecked
        });
      });
  };

  validate = text => {
    if (text.trim()) {
      return true;
    }
    return false;
  };

  removeTodo = (id, text) => {
    axios
      .delete(`http://localhost:2000/todos/${id}/delete`)
      .then(() => {
        this.removeNotify(`Removed: ${text}`);
      })
      .then(() => {
        const todos = [...this.state.todos].filter(todo => todo._id !== id);
        if (todos.length === 0) {
          this.setState({
            isAllChecked: false
          });
        }
        this.setState({
          todos: todos
        });
      });
  };

  handleClickClear = () => {
    axios.delete(`http://localhost:2000/todos/deleteCompleted/`).then(() => {
      const todos = [...this.state.todos].filter(todo => !todo.isCompleted);
      this.setState({
        todos: todos,
        isAllChecked: false
      });
    });
  };

  handleClickFilterButton = tab => {
    this.setState({
      activeTab: tab
    });
  };

  render() {
    const { todos, activeTab, isAllChecked } = this.state;
    const active = todos.filter(todo => !todo.isCompleted);
    const completed = todos.length - active.length;

    return (
      <React.Fragment>
        <h1>todos</h1>
        <div className="content">
          <Add
            isAllChecked={isAllChecked}
            onAddTodos={this.handleAddTodos}
            validate={this.validate}
            onCheckboxChange={this.handleHeaderCheckboxChange}
          />
          <Todos
            data={todos}
            activeTab={activeTab}
            handleEditTodos={this.handleEditTodos}
            handleCheckboxChange={this.handleCheckboxChange}
            validate={this.validate}
            handleRemoveTodos={this.removeTodo}
          />
          {todos.length ? (
            <Footer
              active={active.length}
              completed={completed}
              activeTab={activeTab}
              handleClickClear={this.handleClickClear}
              handleClickFilterButton={this.handleClickFilterButton}
            />
          ) : null}
        </div>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default App;
