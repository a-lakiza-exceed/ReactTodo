import React from "react";
import PropTypes from "prop-types";

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
    this.props.onChange(this.props.data.id);
  };
  onBlurHandler = () => {
    console.log('work');
    
    const { validate } = this.props;
    const text = this.state.text;

    if (validate(text)) {
      this.setState({ isEditing: false });
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
          <input
            className="inp-cbx"
            id={todo.id + "input"}
            type="checkbox"
            checked={todo.isCompleted}
            onChange={this.handleCheckBoxChange}
          />
          <label className="cbx" htmlFor={todo.id + "input"}>
            <span>
              <svg width="12px" height="9px" viewBox="0 0 12 9">
                <polyline points="1 5 4 8 11 1"></polyline>
              </svg>
            </span>
          </label>
          <span
            className={textClasses.join(" ")}
            onDoubleClick={this.handleDoubleClick}
          >
            {todo.text}
          </span>
          <button
            className="removeButton"
            onClick={() => removeTodo(todo.id, todo.text)}
          ></button>
        </div>
      );
    }
    return <React.Fragment>{item}</React.Fragment>;
  }
}

TodoItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })
};

export { TodoItem };
