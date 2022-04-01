
import "@testing-library/react"
import { fireEvent, render, screen } from "@testing-library/react";
import ReactDOM from "react-dom";
import SprintComponent from "./sprint.component";

const board = {
  roomId: "default",
  id: "test",
  columns: [],
  tasks: [],
  start: new Date(),
  finish: new Date()
}
describe("SprintComponent", () => {
  const setup = () => render(<SprintComponent board={board}/>);

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SprintComponent board={board}/>, div)
  });
  
  it("after clicking details must remove default text", () => {
    setup()
    const details = screen.getByTestId("details-element")

    expect(screen.getByText(/Planifica un sprint/i)).toBeInTheDocument()
    fireEvent.click(details)
    expect(screen.queryByText(/Planifica un sprint/i)).not.toBeInTheDocument()
  })
  
  it("after clicking complete sprint button must complete sprint", () => {
    setup()
    const completeSprintButton = screen.getByText("Completar sprint")

    expect(completeSprintButton).toBeInTheDocument()
    fireEvent.click(completeSprintButton)
  })
})


