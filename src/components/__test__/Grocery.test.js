import Grocery from "../Grocery";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("Grocery component renders correctly", () => {
    render(<Grocery />);
    
    // Check if the heading is rendered
    const heading = screen.getByText("Grocery Store");
    expect(heading).toBeInTheDocument();
    
    // Check if the description is rendered
    const description = screen.getByText(/Welcome to our online grocery store/i);
    expect(description).toBeInTheDocument();
    
    // Check if "COMING SOON" text is displayed
    const comingSoon = screen.getByText("COMING SOON");
    expect(comingSoon).toBeInTheDocument();
    
    // Check if the cart emoji is present
    const emoji = screen.getByText("🛒");
    expect(emoji).toBeInTheDocument();
});
