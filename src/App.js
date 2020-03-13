import React from 'react';
import { Add } from './components/Add'
import { Todos } from './components/Todos'
import './App.css';

class App extends React.Component {
  state = {
    todos: [],
  }
  handleAddTodos = data => {
    const nextTodo = [data, ...this.state.todos]
    this.setState({ todos: nextTodo })
  }
  render(){
    const { todos } = this.state
    return (
      <React.Fragment>
        <div>ayec</div>
        <Add onAddTodos={this.handleAddTodos} />
        {Array.isArray(todos) && <Todos data={todos} />}
      </React.Fragment>
    );
  }
}

export default App;
