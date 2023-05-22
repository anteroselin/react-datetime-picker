import DatetimePicker from "components/DatetimePicker";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <DatetimePicker onChange={() => true} />
      <DatetimePicker showTime={true} onChange={() => true} />
    </div>
  );
}

export default App;
