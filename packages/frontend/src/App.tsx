import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateTodo from "./components/CreateTodo/CreateTodo";
import "./App.css";
import Home from "./components/Home/Home";

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">Todos</Link>
          <span className="separator">|</span>
          <Link to="/new">+</Link>
        </header>
        <Switch>
          <Route path="/new">
            <CreateTodo />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
