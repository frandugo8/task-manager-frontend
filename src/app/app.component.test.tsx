
import "@testing-library/react"
import AppComponent from "./app.component"
import ReactDOM from "react-dom"

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppComponent />, div);
});