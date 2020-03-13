import React from 'react';
import PropTypes from 'prop-types';


class Add extends React.Component{
    constructor(props) {
        super(props)
        this.input = React.createRef()
      }
    onKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            const text  = this.input.current.value
            console.log(text)
            if (this.validate(text)){
                console.log('+')
                this.props.onAddTodos({
                  id: +new Date(),
                  text,
                })
            }
            else{
                console.log('-')
            }
        }
    }
    // handleChange = (e) => {
    //     const { id, value } = e.currentTarget
    //     this.setState({ [id]: value })
    // }
    submitHandler = e => {
        e.preventDefault();
        this.input.current.value = ''
    }
    // onBtnClickHandler = e => {
    //     e.preventDefault();
    //     React.findDOMNode(this.refs.input).focus();
    //   }
    validate = (text) => {
        if (text.trim()) {
            return true
        }
        return false
    }
    render() {
        return (
          <form 
            className='add'
            onSubmit={this.submitHandler}
          >
            <input
              id='text'
              type='text'
              autoFocus={true}
              //onChange={this.handleChange}
              onKeyDown={this.onKeyDownHandler}
              className='newItemInput'
              placeholder='What needs to be done?'
              defaultValue=''
              ref={this.input}
            />
            
          </form>
        )
      }
}
    Add.propTypes = {
        onAddTodos: PropTypes.func.isRequired,
    }
   
export {Add}