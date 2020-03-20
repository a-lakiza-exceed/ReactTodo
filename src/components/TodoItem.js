import React from "react";
import PropTypes from "prop-types";
import Checkbox from "./Checkbox";
const classNames = require('classnames')

class TodoItem extends React.Component {
  state = {
    isEditing: false,
    text: this.props.data.text
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

  handleCheckBoxChange = () => {
    this.props.onChange(this.props.data);
  };

  onBlurHandler = () => {
    const { validate } = this.props;
    const text = this.state.text;
    if (validate(text)) {
      this.setState({ isEditing: false });
      this.props.onSave(this.props.data._id, this.state.text);
    }
  };

  onKeyDownHandler = e => {
    if (e.key === "Enter") {
      this.onBlurHandler();
    }
  };

  render() {
    const todo = this.props.data;
    const { removeTodo, tab } = this.props;
    const textClasses = classNames({
      'itemText': true,
      'completed': todo.isCompleted
    });
    const itemClasses = classNames({
      'todoItem': true,
      'hidden': tab !== null &&  todo.isCompleted !== tab
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
          <span
            className={textClasses}
            onDoubleClick={this.handleDoubleClick}
          >
            {todo.text}
          </span>
          <button
            className="removeButton"
            onClick={() => removeTodo(todo._id, todo.text)}
          ></button>
        </div>
      );
    }
    return <React.Fragment>{item}</React.Fragment>;
  }
}

TodoItem.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  }),
  tab: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([null])]),
  onSave: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
};

export default TodoItem;
