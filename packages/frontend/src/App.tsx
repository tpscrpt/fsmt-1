import React from "react";
import Axios from "axios";
import "./App.css";
import logo from "./logo.svg";

function App(): JSX.Element {
  Axios.get("http://localhost:9000").then((response) => console.log(response.data));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
