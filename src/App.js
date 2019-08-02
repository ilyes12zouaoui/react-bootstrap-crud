import React from "react";
import logo from "./logo.svg";
import "./bootstrap/bootstrap.css";
import "./App.css";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
