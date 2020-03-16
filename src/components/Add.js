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
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };
  submitHandler = e => {
    e.preventDefault();
    this.setState({
      text: ""
    });
  };
  // onBtnClickHandler = e => {
  //     e.preventDefault();
  //     React.findDOMNode(this.refs.input).focus();
  //   }

  render() {
    return (
      <form className="add" onSubmit={this.submitHandler}>
        <input type="checkbox" onChange={this.props.onCheckboxChange}/>
        <input
          id="text"
          type="text"
          autoFocus={true}
          onChange={this.handleChange}
          onKeyDown={this.onKeyDownHandler}
          className="newItemInput"
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
