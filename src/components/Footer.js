import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearCompleted } from "../redux/actions/todoActions";
import { setFilter } from "../redux/actions/filterActions";
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from "../redux/types/filterTypes";

class Footer extends React.Component {
  handleClickClear = () => {
    this.props.clearCompleted();
  };

  handleClickFilterButton = event => {
    this.props.setFilter(event.currentTarget.id);
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
            id={SHOW_ALL}
            onClick={this.handleClickFilterButton}
            className={
              this.props.activeTab === SHOW_ALL ? "filterButtons__focused" : ""
            }
          >
            All
          </button>
          <button
            id={SHOW_ACTIVE}
            onClick={this.handleClickFilterButton}
            className={
              this.props.activeTab === SHOW_ACTIVE
                ? "filterButtons__focused"
                : ""
            }
          >
            Active
          </button>
          <button
            id={SHOW_COMPLETED}
            onClick={this.handleClickFilterButton}
            className={
              this.props.activeTab === SHOW_COMPLETED
                ? "filterButtons__focused"
                : ""
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
  activeTab: PropTypes.string,
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
