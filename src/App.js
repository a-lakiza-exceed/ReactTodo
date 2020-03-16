import React from "react";
import { Add } from "./components/Add";
import { Todos } from "./components/Todos";
import "./App.css";

class App extends React.Component {
  state = {
    todos: [],
    isAllChecked: false
  };
  handleAddTodos = data => {
    const nextTodo = [data, ...this.state.todos];
    this.setState({ todos: nextTodo });
    //console.log(this.state.todos)
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
    })
    this.setState({
      todos: todos,
      isAllChecked: isAllChecked
    })
  }
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
  render() {
    const { todos } = this.state;
    return (
      <React.Fragment>
        <h1>todos</h1>
        <Add onAddTodos={this.handleAddTodos} validate={this.validate} onCheckboxChange={this.handleHeaderCheckboxChange}/>
        {Array.isArray(todos) && (
          <Todos
            data={todos}
            handleEditTodos={this.handleEditTodos}
            handleCheckboxChange={this.handleCheckboxChange}
            validate={this.validate}
            handleRemoveTodos={this.removeTodo}
          />
        )}
      </React.Fragment>
    );
  }
}

export default App;
