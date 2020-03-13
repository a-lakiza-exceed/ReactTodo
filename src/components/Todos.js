import React from 'react'
import PropTypes from 'prop-types'
import { Article } from './Article'

class Todos extends React.Component {
  renderTodos = () => {
    const { data } = this.props
    let TodosTemplate = null

    if (data.length) {
      TodosTemplate = data.map(function(item) {
        return <Article key={item.id} data={item} />
      })
    } else {
      TodosTemplate = <p>К сожалению новостей нет</p>
    }

    return TodosTemplate
  }
  render() {
    const { data } = this.props

    return (
      <div className="todos">
        {this.renderTodos()}
        {data.length ? (
          <strong className={'todos__count'}>
            Всего новостей: {data.length}
          </strong>
        ) : null}
      </div>
    )
  }
}

Todos.propTypes = {
  data: PropTypes.array.isRequired,
}

export { Todos }