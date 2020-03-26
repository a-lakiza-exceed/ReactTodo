import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";

const Todos = ({ todos }) => {
  const renderTodos = () => {
    let TodosTemplate = null;
    if (todos.length) {
      TodosTemplate = todos.map(function(item) {
        return <TodoItem key={item._id} todo={item} />;
      });
    }
    return TodosTemplate;
  };

  return <div className="todos">{renderTodos()}</div>;
};

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    todos: state.todos.todos
  };
};

export default connect(mapStateToProps)(Todos);
