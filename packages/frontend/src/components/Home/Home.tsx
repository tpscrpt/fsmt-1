import React from "react";
import { connect } from "react-redux";
import FilterTodos from "./FilterTodos";
import TodosList from "./TodosList/TodosList";
import "./Home.css";

const connector = connect();

function Home(): JSX.Element {
  return (
    <div className="container">
      <div className="Home">
        <FilterTodos />
        <TodosList />
      </div>
    </div>
  );
}

export default connector(Home);
