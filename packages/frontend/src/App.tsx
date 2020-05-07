import React from "react";
import { connect, ConnectedProps } from "react-redux";
import FilterTodos from "./components/FilterTodos";
import TodosList from "./components/TodosList";
import { getTodos } from "./store/actions";

function App({ getTodos }: AppProps): JSX.Element {
  return (
    <div className="App">
      <header className="App-header"></header>
      <button onClick={getTodos}>Get Todos</button>
      <FilterTodos />
      <TodosList />
    </div>
  );
}

const mapDispatchToProps = {
  getTodos,
};

const connector = connect(null, mapDispatchToProps);
type AppProps = ConnectedProps<typeof connector>;

export default connector(App);
