import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearCompleted } from "../actions/todoActions";
import { setFilter } from "../actions/filterActions";
class Footer extends React.Component {
  
  handleClickClear = () => {
    this.props.clearCompleted();
  };

  handleClickFilterButton = tab => {
    this.props.setFilter(tab);
  };

  render() {
    const { todos } = this.props;
    const active = [...todos].filter(todo => !todo.isCompleted).length;
    const completed = todos.length - active;
    const itemWord = active === 1 ? "item" : "items";

    return (
      <div className="footer">
        <span className="activeItemsCount">
          {active} {itemWord} left
        </span>
        <div className="filterButtons">
          <button
            onClick={() => this.handleClickFilterButton(null)}
            className={
              this.props.activeTab === null ? "filterButtons__focused" : ""
            }
          >
            All
          </button>
          <button
            onClick={() => this.handleClickFilterButton(false)}
            className={
              this.props.activeTab === false ? "filterButtons__focused" : ""
            }
          >
            Active
          </button>
          <button
            onClick={() => this.handleClickFilterButton(true)}
            className={
              this.props.activeTab === true ? "filterButtons__focused" : ""
            }
          >
            Completed
          </button>
        </div>
        <div className="clearButtonArea">
          {completed ? (
            <button className="clearButton" onClick={this.handleClickClear}>
              Clear completed
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  todos: PropTypes.array.isRequired,
  activeTab: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([null])]),
  clearCompleted: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
    activeTab: state.filter.activeTab
  };
};
const mapDispatchToProps = {
  clearCompleted,
  setFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
