# react-datertime-picker

A date time picker component using react

## Live Demo: https://react-datetime-picker.vercel.app/

## Usage

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

````

## Basic Example

```tsx

class App extends React.Component<Props, State> {
  state = {
    date: {},
  };

  render() {
    return <DatetimePicker open={this.state.open} onChange={(value) => this.setState({ date: value })} />;
  }
}

export default App;
````

## Basic example using hooks

```tsx
const App: React.FunctionComponent<Props> = (props) => {
  const [date, setDate] = React.useState<Date>({});

  return <DatetimePicker open={open} onChange={(value) => setDateRange(value)} />;
};

export default App;
```

## Props

Name | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
`initialDate` | `Date` | | `today` | initially selected date
`minDate` | `Date, string` | | 10 years ago | min date allowed in picker
`maxDate` | `Date, string` | | 10 years from now | max date allowed in picker
`showTime` | `Boolean` | | `false` | show time picker
`showTimezone` | `Boolean` | | `false` | show tiemzone picker when select time
`format` | `string` | | `YYYY-MM-DD` | set date time format
`onChange` | `(Date) => void` | _required_ | - | handler function for providing selected date
