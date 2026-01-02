import RestaurantCategory from "../RestaurantCategory";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../../utils/cartSlice";
import "@testing-library/jest-dom";

const mockStore = configureStore({
    reducer: {
        cart: cartSlice
    }
});

test("RestaurantCategory component renders correctly", () => {
    const mockCategory = {
        category: "Appetizers",
        items: [
            {
                id: "1",
                name: "Samosa",
                description: "Crispy samosa",
                price: 50,
                image: "samosa.jpg",
                isVeg: true
            },
            {
                id: "2",
                name: "Chicken Wings",
                description: "Spicy wings",
                price: 100,
                image: "wings.jpg",
                isVeg: false
            }
        ]
    };
    
    render(
        <Provider store={mockStore}>
            <RestaurantCategory 
                category={mockCategory} 
                isOpen={true} 
                onToggle={jest.fn()} 
            />
        </Provider>
    );
    
    // Check if category name is rendered
    const categoryName = screen.getByText("Appetizers");
    expect(categoryName).toBeInTheDocument();
    
    // Check if item count is displayed
    const itemCount = screen.getByText("2 items");
    expect(itemCount).toBeInTheDocument();
    
    // Check if items are displayed when expanded
    const samosa = screen.getByText("Samosa");
    expect(samosa).toBeInTheDocument();
    
    const chicken = screen.getByText("Chicken Wings");
    expect(chicken).toBeInTheDocument();
});

test("RestaurantCategory toggle button works", () => {
    const mockOnToggle = jest.fn();
    const mockCategory = {
        category: "Main Course",
        items: []
    };
    
    render(
        <Provider store={mockStore}>
            <RestaurantCategory 
                category={mockCategory} 
                isOpen={false} 
                onToggle={mockOnToggle} 
            />
        </Provider>
    );
    
    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);
    
    expect(mockOnToggle).toHaveBeenCalled();
});

test("RestaurantCategory returns null when category is not provided", () => {
    const { container } = render(
        <Provider store={mockStore}>
            <RestaurantCategory 
                category={null} 
                isOpen={false} 
                onToggle={jest.fn()} 
            />
        </Provider>
    );
    
    expect(container.firstChild).toBeNull();
});
