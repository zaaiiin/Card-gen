import React from "react";
import "./App.css";
import { Landingpage, About, Form } from "./containers";
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
            <Route path="/about" component={About} />
            <Route path="/form" component={Form} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
