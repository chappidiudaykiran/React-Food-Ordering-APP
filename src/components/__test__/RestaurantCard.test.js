import RestaurantCard from "../RestaurantCard";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserContext from "../UserContext";
import "@testing-library/jest-dom";

test("RestaurantCard component renders correctly", () => {
    const mockRes = {
        id: "1",
        name: "KFC",
        avgRating: 4.5,
        avgRatingString: "4.5",
        cuisines: ["Chicken", "Fast Food"],
        sla: { deliveryTime: 30 },
        slaString: "30 mins",
        costForTwo: "₹500",
        cloudinaryImageId: "test-image-id",
        promoted: false
    };
    
    render(
        <BrowserRouter>
            <UserContext.Provider value={{ loggedInUser: "Test User" }}>
                <RestaurantCard res={mockRes} />
            </UserContext.Provider>
        </BrowserRouter>
    );
    
    // Check if restaurant name is rendered
    const name = screen.getByText("KFC");
    expect(name).toBeInTheDocument();
    
    // Check if the link is created with correct ID
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/restaurants/1");
});

test("RestaurantCard returns null when res is not provided", () => {
    const { container } = render(
        <BrowserRouter>
            <UserContext.Provider value={{ loggedInUser: "Test User" }}>
                <RestaurantCard res={null} />
            </UserContext.Provider>
        </BrowserRouter>
    );
    
    expect(container.firstChild).toBeNull();
});
