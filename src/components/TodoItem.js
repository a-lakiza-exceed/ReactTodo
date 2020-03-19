import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "./Checkbox";

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
    this.props.onChange(this.props.data._id);
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
    const textClasses = ["itemText"];
    const itemClasses = ["todoItem"];
    if (tab !== null) {
      if (todo.isCompleted !== tab) {
        itemClasses.push("hidden");
      }
    }
    if (todo.isCompleted) {
      textClasses.push("completed");
    }
    let item;
    if (this.state.isEditing === true) {
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
        <div className={itemClasses.join(" ")}>
          <Checkbox
            handleCheckBoxChange={this.handleCheckBoxChange}
            todo={todo}
          />
          <span
            className={textClasses.join(" ")}
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
  tab: PropTypes.oneOf([null, Boolean]),
  onSave: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
};

export { TodoItem };
