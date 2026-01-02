import Contact from "../Contact"
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";    

test("Contact component renders correctly", () => {
    render(<Contact />);
    const inputboxes = screen.getAllByRole("textbox");
    expect(inputboxes.length).toBe(3); // Name, Email, Message
}); 
