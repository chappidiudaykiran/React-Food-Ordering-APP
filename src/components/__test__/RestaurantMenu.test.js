import RestaurantMenu from "../RestaurantMenu";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../../utils/cartSlice";
import "@testing-library/jest-dom";

// Mock useParams
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ id: "123" })
}));

// Mock useRestaurantMenu hook
jest.mock("../../utils/useRestaurantMenu", () => ({
    __esModule: true,
    default: () => ({
        restaurant: {
            name: "Burger Place",
            avgRating: 4.2,
            costForTwo: "₹300",
            cuisines: ["Burgers", "Fast Food"],
            location: "Downtown"
        },
        menu: [
            {
                category: "Burgers",
                items: [
                    {
                        id: "1",
                        name: "Classic Burger",
                        description: "Tasty burger",
                        price: 150,
                        image: "burger.jpg",
                        isVeg: false
                    }
                ]
            }
        ]
    })
}));

const mockStore = configureStore({
    reducer: {
        cart: cartSlice
    }
});

test("RestaurantMenu component renders correctly", () => {
    render(
        <Provider store={mockStore}>
            <BrowserRouter>
                <RestaurantMenu />
            </BrowserRouter>
        </Provider>
    );
    
    // Check if restaurant name is displayed
    const restaurantName = screen.getByText("Burger Place");
    expect(restaurantName).toBeInTheDocument();
    
    // Check if rating is displayed
    const rating = screen.getByText(/4.2/);
    expect(rating).toBeInTheDocument();
    
    // Check if cost is displayed
    const cost = screen.getByText("₹300");
    expect(cost).toBeInTheDocument();
    
    // Check if category is displayed
    const category = screen.getByText("Burgers");
    expect(category).toBeInTheDocument();
});
