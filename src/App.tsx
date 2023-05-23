import DatetimePicker from "components/DatetimePicker";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="container">
        <DatetimePicker onChange={() => true} />
        <DatetimePicker showTime={true} onChange={() => true} />
        <DatetimePicker showTime={true} showTimezone={true} onChange={() => true} />
      </div>
    </div>
  );
}

export default App;
