
import "@testing-library/react"
import ReactDOM from "react-dom"
import BacklogComponent from "./backlog.component";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BacklogComponent />, div);
});