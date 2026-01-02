import About from "../About";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock UserClass component to avoid fetch issues
jest.mock("../UserClass", () => ({
    __esModule: true,
    default: () => <div>UserClass Component</div>
}));

test("About component renders correctly", () => {
    render(<About />);
    
    // Check if the heading is rendered
    const heading = screen.getByText("About Us");
    expect(heading).toBeInTheDocument();
    
    // Check if the description is rendered
    const description = screen.getByText(/Welcome to our food ordering platform/i);
    expect(description).toBeInTheDocument();
    
    // Check if "Our Team" heading is rendered
    const teamHeading = screen.getByText("Our Team");
    expect(teamHeading).toBeInTheDocument();
    
    // Check if the mocked UserClass is rendered
    const userClass = screen.getByText("UserClass Component");
    expect(userClass).toBeInTheDocument();
});
