import React from "react";
import PropTypes from "prop-types";
import { TodoItem } from "./TodoItem";

class Todos extends React.Component {
  renderTodos = () => {
    const { data } = this.props;
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
            onSave={handleEditTodos}
            validate={validate}
            onChange={handleCheckboxChange}
            removeTodo={handleRemoveTodos}
          />
        );
      });
    } else {
      TodosTemplate = <p>К сожалению новостей нет</p>;
    }

    return TodosTemplate;
  };
  render() {
    const { data } = this.props;
    const active = data.filter(todo => todo.isCompleted === false);
    return (
      <div className="todos">
        {this.renderTodos()}
        {data.length ? (
          <strong className={"todos__count"}>items: {active.length}</strong>
        ) : null}
      </div>
    );
  }
}

Todos.propTypes = {
  data: PropTypes.array.isRequired
};

export { Todos };
