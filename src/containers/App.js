import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Add from "../components/Add";
import Todos from "../components/Todos";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import { loadData } from "../actions/todoActions";

class App extends React.Component {
  
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    const { todos } = this.props;
    return (
      <React.Fragment>
        <h1>todos</h1>
        <div className="content">
          <Add />
          <Todos />
          {todos.length ? <Footer /> : null}
        </div>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  }),
  loadData: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    todos: state.todos.todos
  };
};
const mapDispatchToProps = {
  loadData
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
