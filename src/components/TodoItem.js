import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { removeTodo, editTodo, completeTodo } from "../actions/todoActions";
import Checkbox from "./Checkbox";
import { SHOW_ALL, SHOW_ACTIVE } from "../types/filterTypes";
const classNames = require("classnames");

class TodoItem extends React.Component {
  state = {
    isEditing: false,
    text: this.props.todo.text,
    oldValue: ""
  };

  handleDoubleClick = () => {
    this.setState({ oldValue: this.state.text, isEditing: true });
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
    const { oldValue, text } = this.state;
    this.setState({ isEditing: false });
    if (text.trim()) {
      if (oldValue !== text.trim()) {
        this.props.editTodo(this.props.todo._id, text);
      }
    } else {
      toast.warning("Invalid value");
      this.setState({
        text: oldValue
      })
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
    const isActiveTab = tab === SHOW_ACTIVE ? true : false;
    const itemClasses = classNames("todoItem", {
      hidden: tab !== SHOW_ALL && todo.isCompleted === isActiveTab
    });
    let item;
    if (this.state.isEditing) {
      item = (
        <div className='todoItemEditing'>
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
  tab: PropTypes.string
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
