import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateTodo from "./components/CreateTodo/CreateTodo";
import "./App.css";
import Home from "./components/Home/Home";
import { getTodos } from "./store/actions";
import { connect, ConnectedProps } from "react-redux";

const mapDispatchToProps = {
  getTodos,
};

const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

function App({ getTodos }: Props): JSX.Element {
  console.log("rendering App");
  getTodos();
  return (
    <Router>
      <div className="App">
        <div className="container">
          <header className="App-header">
            <Link to="/">Todos</Link>
            <span className="separator">|</span>
            <Link to="/new">+</Link>
          </header>
        </div>
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

export default connector(App);
