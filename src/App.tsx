import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DatetimePicker from "components/DatetimePicker";

function App() {
  return (
    <div className="App">
      <DatetimePicker onChange={() => true} />
    </div>
  );
}

export default App;
