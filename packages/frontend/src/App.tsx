import React from "react";
import { client } from "./services/client";

function App(): JSX.Element {
  client.getTodos().then((todos) => {
    console.log(todos);
  });
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
