import { render, screen, fireEvent } from "@testing-library/react";
import ReportComment from "../components/reportComment";

const mockedUsedNavigate = jest.fn();
import * as router from 'react-router';
const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})



describe("Report comment component test suite", () => {
   
  // define test cases
  test("verify Report component title is correct or not", () => {
    // Render Counter component into virtual dom
    const component = render(<ReportComment />);
    // Get title element by using testid
    const titleEle = component.getByTestId("title");
    // Compare title
    expect(titleEle.textContent).toBe("REPORT COMMENT");
  }); //test-end

   test("verify Report component message label is correct or not", () => {
    // Render Counter component into virtual dom
    const component = render(<ReportComment />);
    // Get title element by using testid
    const titleEle = component.getByTestId("Message");
    // Compare title
    expect(titleEle.textContent).toBe("Message");
  });

  test("verify Report component Comment label is correct or not", () => {
    // Render Counter component into virtual dom
    const component = render(<ReportComment />);
    // Get title element by using testid
    const titleEle = component.getByTestId("Comment");
    // Compare title
    expect(titleEle.textContent).toBe("Comment");
  });

  test("verify text on Submit button", () => {
    // Render Counter component into virtual dom
    const component = render(<ReportComment />);
    // Get title element by using id
    const incrBtnEle = component.getByTestId("SUBMIT");
    // Compare title
    expect(incrBtnEle.textContent).toBe("SUBMIT");
  });

//   test("verify text on decrement button", () => {
//     // loading component into virtual dom
//     render(<Counter />);
//     // Getting element from virutal dom
//     const decrBtnElem = screen.getByRole("button", { name: "Decrement" });
//     // Verify button text
//     expect(decrBtnElem.textContent).toBe("Decrement");
//   }); // 3rd test end
//   test("verify counter value is incremented by clicking on increment button", () => {
//     // loading component into virtual dom
//     render(<Counter />);

//     // Getting element from virutal dom
//     const incrBtnElem = screen.getByRole("button", { name: "Increment" });
//     const countElem = screen.getByTestId("counter");

//     expect(countElem.textContent).toBe("0");
//     // click on incr button
//     fireEvent.click(incrBtnElem);
//     expect(countElem.textContent).toBe("1");
//     fireEvent.click(incrBtnElem);
//     expect(countElem.textContent).toBe("2");
//   }); // 4th test end
});