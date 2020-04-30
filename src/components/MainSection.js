import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Add from "components/Add";
import Todos from "components/Todos";
import Footer from "components/Footer";
import { loadData } from "redux/actions/todoActions";
import "containers/App.css";
import "react-toastify/dist/ReactToastify.css";

class MainSection extends React.Component {

    componentDidMount() {
        this.props.loadData(this.props.auth.user.id);
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
            </React.Fragment>
        );
    }
}

MainSection.propTypes = {
    todo: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired
    }),
};

const mapStateToProps = state => {
    return {
        todos: state.todos.todos,
        auth: state.auth
    };
};
const mapDispatchToProps = {
    loadData
};

export default connect(mapStateToProps, mapDispatchToProps)(MainSection);
