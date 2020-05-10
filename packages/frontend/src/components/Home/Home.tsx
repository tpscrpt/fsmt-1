import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { getTodos } from "../../store/actions";
import FilterTodos from "./FilterTodos";
import TodosList from "./TodosList";
import "./Home.css";

const mapDispatchToProps = {
  getTodos,
};

const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

function Home({ getTodos }: Props): JSX.Element {
  return (
    <div className="Home">
      <FilterTodos />
      <button onClick={getTodos}>Get Todos</button>
      <TodosList />
    </div>
  );
}

export default connector(Home);
