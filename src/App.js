import React from "react";
import "./App.css";
import {
  Landingpage,
  About,
  Form,
  UpcomingEvents,
  Dashboard,
} from "./containers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Notifications } from "react-push-notification";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Landingpage />
            </Route>
            <Route path="/about" component={About} />
            <Route path="/form" component={Form} />
            <Route path="/upcomingevents" component={UpcomingEvents} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
