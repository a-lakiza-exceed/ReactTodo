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

  loadData = () => {
    axios
      .get(`http://localhost:2000/todos/`)
      .then(res => {
        const todos = [...res.data].map(todo => {
          const newTodo = {
            id: todo._id,
            text: todo.text,
            isCompleted: todo.isCompleted
          };
          return newTodo;
        });
        this.setState({ todos });
      })
      .then(() => {
        const isAllCompleted = [...this.state.todos].every(
          todo => todo.isCompleted === true
        );
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
      });
  };

  componentDidMount() {
    this.loadData();
  }

  addNotify = text => toast.success(text);

  removeNotify = text => toast.error(text);

  handleAddTodos = data => {
    this.addNotify("Added todo: " + data.text);
    axios
      .post(`http://localhost:2000/todos/create/`, {
        text: data.text,
        isCompleted: data.isCompleted
      })
      .then(res => {
        this.loadData();
      });
  };

  handleEditTodos = (id, text) => {
    axios
      .put(`http://localhost:2000/todos/${id}/update`, {
        text: text
      })
      .then(res => {
        this.loadData();
      });
  };

  handleCheckboxChange = id => {
    const todo = [...this.state.todos].find(todo => todo.id === id);
    axios
      .put(`http://localhost:2000/todos/${id}/update`, {
        isCompleted: !todo.isCompleted
      })
      .then(res => {
        this.loadData();
      });
  };

  handleHeaderCheckboxChange = () => {
    const isAllChecked = !this.state.isAllChecked;
    const todos = [...this.state.todos].filter(
      todo => todo.isCompleted !== isAllChecked
    );
    let promises = [];
    todos.forEach(todo => {
      promises.push(
        axios.put(`http://localhost:2000/todos/${todo.id}/update`, {
          isCompleted: !todo.isCompleted
        })
      );
    });
    Promise.all(promises).then(() => this.loadData());
  };

  validate = text => {
    if (text.trim()) {
      return true;
    }
    return false;
  };

  removeTodo = (id, text) => {
    axios.delete(`http://localhost:2000/todos/${id}/delete`).then(res => {
      this.loadData();
    });
    this.removeNotify("Removed: " + text);
  };

  handleClickClear = () => {
    const completed = [...this.state.todos].filter(
      todo => todo.isCompleted === true
    );

    let promises = [];
    completed.forEach(todo => {
      promises.push(
        axios.delete(`http://localhost:2000/todos/${todo.id}/delete`)
      );
    });
    Promise.all(promises).then(() => this.loadData());
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
