import React from "react";
import { Add } from "./components/Add";
import { Todos } from "./components/Todos";
import { Footer } from "./components/Footer";
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

  handleAddTodos = data => {
    axios
      .post(`http://localhost:2000/todos/create/`, {
        text: data.text,
        isCompleted: data.isCompleted
      })
      .then(res => {
        const nextTodo = [res.data, ...this.state.todos];
        this.setState({ todos: nextTodo });
        this.addNotify(`Added todo: ${data.text}`);
      });
  };

  handleEditTodos = (id, text) => {
    const todos = [...this.state.todos].map(todo => {
      if (todo._id === id) {
        todo.text = text;
      }
      return todo;
    });
    this.setState({
      todos
    });
    axios.put(`http://localhost:2000/todos/${id}/update`, {
      text: text
    });
  };

  handleCheckboxChange = id => {
    const todos = [...this.state.todos].map(todo => {
      if (todo._id === id) {
        todo.isCompleted = !todo.isCompleted;
        axios.put(`http://localhost:2000/todos/${id}/update`, {
          isCompleted: todo.isCompleted
        });
      }
      return todo;
    });
    const isAllCompleted = todos.every(todo => todo.isCompleted);
    if (isAllCompleted) {
      this.setState({
        isAllChecked: true
      });
    } else {
      if (this.state.isAllChecked) {
        this.setState({
          isAllChecked: false
        });
      }
    }
    this.setState({
      todos: todos
    });
  };

  handleHeaderCheckboxChange = () => {
    const isAllChecked = !this.state.isAllChecked;
    const todos = [...this.state.todos].map(todo => {
      todo.isCompleted = isAllChecked;
      return todo;
    });
    this.setState({
      todos: todos,
      isAllChecked: isAllChecked
    });
    axios.put(`http://localhost:2000/todos/updateMany`, {
      isCompleted: isAllChecked
    });
  };

  validate = text => {
    if (text.trim()) {
      return true;
    }
    return false;
  };

  removeTodo = (id, text) => {
    const todos = [...this.state.todos].filter(todo => todo._id !== id);
    if (todos.length === 0) {
      this.setState({
        isAllChecked: false
      });
    }
    this.setState({
      todos: todos
    });
    axios.delete(`http://localhost:2000/todos/${id}/delete`).then(res => {
      this.removeNotify(`Removed: ${text}`);
    });
  };

  handleClickClear = () => {
    let ids = [];
    [...this.state.todos].forEach(todo => {
      if (todo.isCompleted) {
        ids.push(todo._id);
      }
    });
    axios.delete(`http://localhost:2000/todos/deleteMany/${ids}`);
    const todos = [...this.state.todos].filter(todo => !todo.isCompleted);
    this.setState({
      todos: todos,
      isAllChecked: false
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
        {todos.length ? (
          <React.Fragment>
            <div className="footer__1floor"></div>
            <div className="footer__2floor"></div>
          </React.Fragment>
        ) : null}
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default App;
