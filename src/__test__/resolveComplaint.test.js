import { render, screen, fireEvent } from "@testing-library/react";
import ReportComment from "../components/reportComment";

const mockedUsedNavigate = jest.fn();
import * as router from 'react-router';
import ResolveComplaint from "../components/resolveComplaint";
const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

describe("Report Post component test suite", () => {
   
  // define test cases
  test("verify resolve complaint title is correct or not", () => {
    // Render Counter component into virtual dom
    const component = render(<ResolveComplaint />);
    // Get title element by using testid
    const titleEle = component.getByTestId("title");
    // Compare title
    expect(titleEle.textContent).toBe("Update Complaint Status");
  }); //test-end

   test("verify text on label", () => {
    // Render Counter component into virtual dom
    const component = render(<ResolveComplaint />);
    // Get title element by using testid
    const titleEle = component.getByTestId("Complaint");
    // Compare title
    expect(titleEle.textContent).toBe("Complaint Id:");
  });

  test("verify text on update button", () => {
    // Render Counter component into virtual dom
    const component = render(<ResolveComplaint />);
    // Get title element by using testid
    const titleEle = component.getByTestId("Update");
    // Compare title
    expect(titleEle.textContent).toBe("Update");
  });

  test("verify text on dropdown", () => {
    // Render Counter component into virtual dom
    const component = render(<ResolveComplaint />);
    // Get title element by using id
    const incrBtnEle = component.getByTestId("Status");
    // Compare title
    expect(incrBtnEle.textContent).toBe("Select Query Status");
  });

  test("verify text on list", () => {
    // Render Counter component into virtual dom
    const component = render(<ResolveComplaint />);
    // Get title element by using id
    const incrBtnEle = component.getByTestId("QUERY_RAISED");
    // Compare title
    expect(incrBtnEle.textContent).toBe("QUERY_RAISED");
  });

  test("verify text on list", () => {
    // Render Counter component into virtual dom
    const component = render(<ResolveComplaint />);
    // Get title element by using id
    const incrBtnEle = component.getByTestId("QUERY_RESOLVED");
    // Compare title
    expect(incrBtnEle.textContent).toBe("QUERY_RESOLVED");
  });
});