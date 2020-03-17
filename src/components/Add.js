import React from "react";
import PropTypes from "prop-types";

class Add extends React.Component {
  state = {
    text: ""
  };
  onKeyDownHandler = e => {
    if (e.key === "Enter") {
      const { validate } = this.props;
      const text = this.state.text;
      if (validate(text)) {
        this.props.onAddTodos({
          id: +new Date(),
          isCompleted: false,
          text
        });
      }
    }
  };
  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ text: value });
  };
  submitHandler = e => {
    e.preventDefault();
    this.setState({
      text: ""
    });
  };

  render() {
    return (
      <form className="addForm" onSubmit={this.submitHandler}>
        <input
          type="checkbox"
          className="toggleAll"
          onChange={this.props.onCheckboxChange}
        />
        <input
          id="newItem"
          className="input"
          type="text"
          autoFocus={true}
          onChange={this.handleChange}
          onKeyDown={this.onKeyDownHandler}
          placeholder="What needs to be done?"
          value={this.state.text}
        />
      </form>
    );
  }
}
Add.propTypes = {
  onAddTodos: PropTypes.func.isRequired
};

export { Add };
