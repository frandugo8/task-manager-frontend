
import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom"
import {
  mockGetComputedStyle,
  mockDndSpacing,
  makeDnd,
  DND_DIRECTION_DOWN,
} from 'react-beautiful-dnd-test-utils';
import BoardComponent from "./board.component";

const verifyTaskOrder = (
  orderedTasks: string[]
): void => {
  const texts = screen.getAllByText(/task/i)
    .map(x => x.textContent);
  expect(texts).toEqual(orderedTasks);
};

describe("TableComponent", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BoardComponent/>, div);
  });

  describe("dnd", () => {
    beforeEach(() => {
      mockGetComputedStyle();
    });

    it("moves a task down inside a column", async () => {
      const {container} = render(<BoardComponent/>)
      mockDndSpacing(container);
  
      await makeDnd({
        getDragElement: () =>
          screen
            .getByText('First task'),
        direction: DND_DIRECTION_DOWN,
        positions: 2
      });
  
      verifyTaskOrder([
        'Second task',
        'Third task',
        'First task',
        'Fourth task',
        'Fifth task'
      ])
    })
  })
})
