import React from 'react' ;
import PropTypes from 'prop-types';

class Article extends React.Component {
    // state = {
    //   visible: false,
    // }
    render() {
      const {  text } = this.props.data
      console.log(text)
      // const { visible } = this.state
      return (
        <div className='article'>
          <p className='todos__text'>{text}</p>
        </div>
      )
    }
  }
  
  Article.propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired, // добавили id, это число, обязательно
      text: PropTypes.string.isRequired,

    })
  }

  export {Article}