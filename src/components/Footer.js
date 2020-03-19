import React from "react";
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    const { active, completed, handleClickFilterButton } = this.props;
    const itemWord = active === 1 ? "item" : "items";
    return (
      <div className="footer">
        <span className="activeItemsCount">
          {active} {itemWord} left
        </span>
        <div className="filterButtons">
          <button
            onClick={() => handleClickFilterButton(null)}
            className={
              null === this.props.activeTab ? "filterButtons__focused" : ""
            }
          >
            All
          </button>
          <button
            onClick={() => handleClickFilterButton(false)}
            className={
              false === this.props.activeTab ? "filterButtons__focused" : ""
            }
          >
            Active
          </button>
          <button
            onClick={() => handleClickFilterButton(true)}
            className={
              true === this.props.activeTab ? "filterButtons__focused" : ""
            }
          >
            Completed
          </button>
        </div>
        <div className="clearButtonArea">
          {completed ? (
            <button
              className="clearButton"
              onClick={this.props.handleClickClear}
            >
              Clear completed
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  active: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  activeTab: PropTypes.oneOf([null, Boolean]),
  handleClickClear: PropTypes.func.isRequired,
  handleClickFilterButton: PropTypes.func.isRequired
};

export { Footer };
