import Cart from "../Cart";
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

test("Cart component renders empty state correctly", () => {
    render(
        <Provider store={mockStore}>
            <Cart />
        </Provider>
    );
    
    // Check if the heading is displayed
    const heading = screen.getByText("Your Cart");
    expect(heading).toBeInTheDocument();
    
    // Check if empty state message is displayed
    const emptyMessage = screen.getByText("Your cart is empty.");
    expect(emptyMessage).toBeInTheDocument();
    
    // Check if the secondary message is displayed
    const secondaryMessage = screen.getByText("Add items to get started!");
    expect(secondaryMessage).toBeInTheDocument();
});

test("Cart component renders with items", () => {
    // Create a store with items in the cart
    const storeWithItems = configureStore({
        reducer: {
            cart: cartSlice
        },
        preloadedState: {
            cart: {
                items: [
                    {
                        cartItemId: "1",
                        name: "Biryani",
                        price: 250,
                        image: "biryani.jpg"
                    }
                ]
            }
        }
    });
    
    render(
        <Provider store={storeWithItems}>
            <Cart />
        </Provider>
    );
    
    // Check if the item is displayed
    const itemName = screen.getByText("Biryani");
    expect(itemName).toBeInTheDocument();
});
