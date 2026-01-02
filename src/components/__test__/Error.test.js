import Error from "../Error";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock useRouteError
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useRouteError: () => ({
        status: 404,
        statusText: "Not Found"
    })
}));

test("Error component renders correctly", () => {
    render(
        <BrowserRouter>
            <Error />
        </BrowserRouter>
    );
    
    // Check if the error message is displayed
    const heading = screen.getByText("Page Not Found");
    expect(heading).toBeInTheDocument();
    
    // Check if the description is displayed
    const description = screen.getByText(/The page you're looking for doesn't exist/i);
    expect(description).toBeInTheDocument();
    
    // Check if the status code is displayed
    const status = screen.getByText(/404 - Not Found/i);
    expect(status).toBeInTheDocument();
    
    // Check if the home link is present
    const homeLink = screen.getByText("Go to Home");
    expect(homeLink).toBeInTheDocument();
});
