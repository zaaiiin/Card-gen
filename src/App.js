import React from "react";
import "./App.css";
import { Landingpage, About } from "./containers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Landingpage />
            </Route>
            <Route path="/About" component={About} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
