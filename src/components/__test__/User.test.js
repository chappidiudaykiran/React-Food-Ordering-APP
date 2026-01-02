import User from "../User";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("User component renders correctly with props", () => {
    const props = {
        name: "John Doe",
        location: "New York",
        contact: "9876543210"
    };
    
    render(<User {...props} />);
    
    // Check if the name is displayed
    const name = screen.getByText(/Name:John Doe/i);
    expect(name).toBeInTheDocument();
    
    // Check if the location is displayed
    const location = screen.getByText(/Location:New York/i);
    expect(location).toBeInTheDocument();
    
    // Check if the contact is displayed
    const contact = screen.getByText(/Contact:9876543210/i);
    expect(contact).toBeInTheDocument();
    
    // Check if the counts are displayed
    const count1 = screen.getByText("Count1:0");
    expect(count1).toBeInTheDocument();
    
    const count2 = screen.getByText("Count2:1");
    expect(count2).toBeInTheDocument();
});
