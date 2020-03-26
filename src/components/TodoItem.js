import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeTodo, editTodo, completeTodo } from "../actions/todoActions";
import Checkbox from "./Checkbox";
const classNames = require("classnames");

class TodoItem extends React.Component {
  state = {
    isEditing: false,
    text: this.props.todo.text
  };

  handleDoubleClick = () => {
    this.setState({ isEditing: true });
  };

  handleChange = e => {
    const text = e.currentTarget.value;
    this.setState({
      text: text
    });
  };

  handleRemoveButtonClick = (id, text) => {
    this.props.removeTodo(id, text);
  };

  handleCheckBoxChange = () => {
    this.props.completeTodo(this.props.todo);
  };

  onBlurHandler = () => {
    const text = this.state.text;
    if (text.trim()) {
      this.setState({ isEditing: false });
      this.props.editTodo(this.props.todo._id, this.state.text);
    }
  };

  onKeyDownHandler = e => {
    if (e.key === "Enter") {
      this.onBlurHandler();
    }
  };

  render() {
    const { todo, tab } = this.props;
    const textClasses = classNames({
      itemText: true,
      completed: todo.isCompleted
    });
    const itemClasses = classNames("todoItem", {
      hidden: tab !== null && todo.isCompleted !== tab
    });
    let item;
    if (this.state.isEditing) {
      item = (
        <div>
          <input
            className="input"
            onChange={this.handleChange}
            onKeyDown={this.onKeyDownHandler}
            onBlur={this.onBlurHandler}
            value={this.state.text}
          />
        </div>
      );
    } else {
      item = (
        <div className={itemClasses}>
          <Checkbox
            handleCheckBoxChange={this.handleCheckBoxChange}
            todo={todo}
          />
          <span className={textClasses} onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </span>
          <button
            className="removeButton"
            onClick={() => this.handleRemoveButtonClick(todo._id, todo.text)}
          ></button>
        </div>
      );
    }
    return <React.Fragment>{item}</React.Fragment>;
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  }),
  tab: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([null])]),
};

const mapStateToProps = state => {
  return {
    tab: state.filter.activeTab
  };
};
const mapDispatchToProps = {
  removeTodo,
  editTodo,
  completeTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
