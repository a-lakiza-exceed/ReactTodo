import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTodo, completeAllTodos } from "../actions/todoActions";

class Add extends React.Component {
  state = {
    text: ""
  };

  handleCheckboxChange = event => {
    this.props.completeAllTodos(event.currentTarget.checked);
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ text: value });
  };

  submitHandler = e => {
    e.preventDefault();
    const { text } = this.state;
    if (text.trim()) {
      this.props.addTodo(text);
      this.setState({
        text: ""
      });
    }
  };

  render() {
    return (
      <form className="addForm" onSubmit={this.submitHandler}>
        <input
          type="checkbox"
          className="toggleAll"
          checked={this.props.areAllCompleted}
          onChange={this.handleCheckboxChange}
        />
        <input
          id="newItem"
          className="input"
          type="text"
          autoFocus={true}
          onChange={this.handleChange}
          placeholder="What needs to be done?"
          value={this.state.text}
        />
      </form>
    );
  }
}

Add.propTypes = {
  addTodo: PropTypes.func.isRequired,
  areAllCompleted: PropTypes.bool.isRequired,
  completeAllTodos: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    areAllCompleted: state.todos.areAllCompleted
  };
};
const mapDispatchToProps = {
  addTodo,
  completeAllTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
