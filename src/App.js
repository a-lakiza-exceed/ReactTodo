import React from "react";
import { Add } from "./components/Add";
import { Todos } from "./components/Todos";
import { Footer } from "./components/Footer";
import "./App.css";

class App extends React.Component {
  state = {
    todos: [],
    isAllChecked: false,
    activeTab: null
  };
  handleAddTodos = data => {
    const nextTodo = [data, ...this.state.todos];
    this.setState({ todos: nextTodo });
  };

  handleEditTodos = (id, text) => {
    let todos = this.state.todos;
    todos = todos.map(todo => {
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
    let todos = this.state.todos;
    todos = todos.map(todo => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    this.setState({
      todos: todos
    });
  };
  handleHeaderCheckboxChange = () => {
    let isAllChecked = this.state.isAllChecked;
    isAllChecked = !isAllChecked;
    let todos = this.state.todos;
    todos = todos.map(todo => {
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
  removeTodo = id => {
    let todos = this.state.todos;
    todos = todos.filter(todo => todo.id !== id);
    this.setState({
      todos: todos
    });
  };
  handleClickClear = () => {
    let todos = this.state.todos;
    todos = todos.filter(todo => todo.isCompleted === false);
    this.setState({
      todos: todos
    });
  };

  handleClickFilterButton = tab => {
    this.setState({
      activeTab: tab
    });
  };

  render() {
    const { todos, activeTab } = this.state;
    const active = todos.filter(todo => todo.isCompleted === false);
    const completed = todos.length - active.length;
    return (
      <React.Fragment>
        <h1>todos</h1>
        <div className="content">
          <Add
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
      </React.Fragment>
    );
  }
}

export default App;
