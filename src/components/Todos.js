import React from "react";
import PropTypes from "prop-types";
import { TodoItem } from "./TodoItem";

class Todos extends React.Component {
  renderTodos = () => {
    const {
      data,
      activeTab,
      handleEditTodos,
      validate,
      handleRemoveTodos,
      handleCheckboxChange
    } = this.props;
    let TodosTemplate = null;
    if (data.length) {
      TodosTemplate = data.map(function(item) {
        return (
          <TodoItem
            key={item.id}
            data={item}
            tab={activeTab}
            onSave={handleEditTodos}
            validate={validate}
            onChange={handleCheckboxChange}
            removeTodo={handleRemoveTodos}
          />
        );
      });
    }
    return TodosTemplate;
  };

  render() {
    return <div className="todos">{this.renderTodos()}</div>;
  }
}

Todos.propTypes = {
  data: PropTypes.array.isRequired,
  activeTab: PropTypes.oneOf([null, Boolean]),
  handleEditTodos: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  handleRemoveTodos: PropTypes.func.isRequired
};

export { Todos };
