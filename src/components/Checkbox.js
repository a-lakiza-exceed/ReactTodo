import React from "react";
import PropTypes from "prop-types";

class Checkbox extends React.Component {
  render() {
    const { todo, handleCheckBoxChange } = this.props;
    return (
      <React.Fragment>
        <input
          className="inp-cbx"
          id={`${todo._id}input`}
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleCheckBoxChange}
        />
        <label className="cbx" htmlFor={`${todo._id}input`}>
          <span>
            <svg width="12px" height="9px" viewBox="0 0 12 9">
              <polyline points="1 5 4 8 11 1"></polyline>
            </svg>
          </span>
        </label>
      </React.Fragment>
    );
  }
}

Checkbox.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  }),
  handleCheckBoxChange: PropTypes.func.isRequired
};

export { Checkbox };
