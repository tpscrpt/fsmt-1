import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FilterTodos from "./components/FilterTodos";
import TodosList from "./components/TodosList";
import CreateTodo from "./components/CreateTodo/CreateTodo";
import { getTodos } from "./store/actions";
import "./App.css";

function App({ getTodos }: AppProps): JSX.Element {
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
            <FilterTodos />
            <button onClick={getTodos}>Get Todos</button>
            <TodosList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = {
  getTodos,
};

const connector = connect(null, mapDispatchToProps);
type AppProps = ConnectedProps<typeof connector>;

export default connector(App);
