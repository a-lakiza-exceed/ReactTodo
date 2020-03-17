import React from "react";
import PropTypes from "prop-types";
import { TodoItem } from "./TodoItem";

class Todos extends React.Component {
  renderTodos = () => {
    const { data, activeTab } = this.props;
    const { handleEditTodos } = this.props;
    const { handleRemoveTodos } = this.props;
    const { handleCheckboxChange } = this.props;
    const { validate } = this.props;
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
  data: PropTypes.array.isRequired
};

export { Todos };
