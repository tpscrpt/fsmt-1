import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { getTodos } from "../../store/actions";
import FilterTodos from "./FilterTodos";
import TodosList from "./TodosList/TodosList";
import "./Home.css";

const mapDispatchToProps = {
  getTodos,
};

const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

function Home({ getTodos }: Props): JSX.Element {
  return (
    <div className="Home">
      <button onClick={getTodos}>Get Todos</button>
      <FilterTodos />
      <TodosList />
    </div>
  );
}

export default connector(Home);
