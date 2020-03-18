import React from "react";
import { Add } from "./components/Add";
import { Todos } from "./components/Todos";
import { Footer } from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends React.Component {
  state = {
    todos: [],
    isAllChecked: false,
    activeTab: null
  };
  addNotify = text => toast.success(text);
  removeNotify = text => toast.error(text);
  handleAddTodos = data => {
    const nextTodo = [data, ...this.state.todos];
    this.addNotify("Added todo: " + data.text)
    this.setState({ todos: nextTodo });
  };

  handleEditTodos = (id, text) => {
    const todos = [...this.state.todos].map(todo => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
    this.setState({
      todos: todos
    });
  };

  handleCheckboxChange = id => {
    const todos = [...this.state.todos].map(todo => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    const isAllCompleted = todos.every(todo => todo.isCompleted === true);
    if (isAllCompleted) {
      this.setState({
        isAllChecked: true
      });
    } else {
      if (this.state.isAllChecked === true) {
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
    let isAllChecked = this.state.isAllChecked;
    isAllChecked = !isAllChecked;
    const todos = [...this.state.todos].map(todo => {
      todo.isCompleted = isAllChecked;
      return todo;
    });
    this.setState({
      todos: todos,
      isAllChecked: isAllChecked
    });
  };

  validate = text => {
    if (text.trim()) {
      return true;
    }
    return false;
  };

  removeTodo = (id, text) => {
    const todos = [...this.state.todos].filter(todo => todo.id !== id);
    if (todos.length === 0) {
      this.setState({
        isAllChecked: false
      });
    }
    this.removeNotify("Removed: " + text)
    this.setState({
      todos: todos
    });
  };
  handleClickClear = () => {
    const todos = [...this.state.todos].filter(
      todo => todo.isCompleted === false
    );
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
    const active = todos.filter(todo => todo.isCompleted === false);
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
