import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainSection from "components/MainSection";
import Navbar from "components/Navbar";
import Register from "components/Register";
import Login from "components/Login";
import PrivateRoute from "components/private-route/PrivateRoute";

class Routes extends React.Component {
    render() {
      return (
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <PrivateRoute exact path="/" component={MainSection} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
            <ToastContainer />
          </div>
        </Router>
      );
    }
  }
  
  export default Routes