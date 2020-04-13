import React from "react";
import MainSection from "../components/MainSection";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import Register from "../components/Register";
import Login from "../components/Login";
import PrivateRoute from "../components/private-root/PrivateRoot";

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/" component={MainSection} />
          </Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <ToastContainer />
        </div>
      </Router>
    );
  }
}

export default App
