import React from "react";
import PropTypes from "prop-types";

class TodoItem extends React.Component {
  state = {
    isEditing: false,
    text: this.props.data.text,
  };

  handleDoubleClick = () => {
    this.setState({ isEditing: "true" });
  };

  handleChange = e => {
    const text = e.currentTarget.value;
    this.setState({
      text: text
    });
  };
  handleCheckBoxChange = () => {
    this.props.onChange(this.props.data.id);
  };
  onBlurHandler = () => {
    const { validate } = this.props;
    const text = this.state.text;

    if (validate(text)) {
      this.setState({ isEditing: "false" });
      this.props.onSave(this.props.data.id, this.state.text);
    }
  };
  onKeyDownHandler = e => {
    if (e.key === "Enter") {
      this.onBlurHandler();
    }
  };

  render() {
    const todo = this.props.data;
    const { removeTodo } = this.props;
    const classes = [];
    if (todo.isCompleted) {
      classes.push("completed");
    }
    let item;
    if (this.state.isEditing === "true") {
      item = (
        <li>
          <input
            editing={this.state.isEditing}
            onChange={this.handleChange}
            onKeyDown={this.onKeyDownHandler}
            onBlur={this.onBlurHandler}
            value={this.state.text}
          />
        </li>
      );
    } else {
      item = (
        <li className="todoItem">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={this.handleCheckBoxChange}
          />
          <p
            className={classes.join(" ")}
            onDoubleClick={this.handleDoubleClick}
          >
            {todo.text}{" "}
          </p>
          <button onClick={() => removeTodo(todo.id)}>&times;</button>
        </li>
      );
    }
    //console.log(text, completed)
    //const { visible } = this.state
    return <div>{item}</div>;
  }
}

TodoItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired, // добавили id, это число, обязательно
    text: PropTypes.string.isRequired
  })
};

export { TodoItem };
