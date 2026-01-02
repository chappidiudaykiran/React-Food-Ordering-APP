import Body from "../Body";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../../utils/cartSlice";
import UserContext from "../UserContext";
import "@testing-library/jest-dom";

// Mock useOnlineStatus hook
jest.mock("../../utils/useOnlineStatus", () => ({
    __esModule: true,
    default: () => true
}));

const mockStore = configureStore({
    reducer: {
        cart: cartSlice
    }
});

const mockSetUserName = jest.fn();

test("Body component displays search input after loading", async () => {
    render(
        <Provider store={mockStore}>
            <BrowserRouter>
                <UserContext.Provider value={{ setUserName: mockSetUserName, loggedInUser: "" }}>
                    <Body />
                </UserContext.Provider>
            </BrowserRouter>
        </Provider>
    );
    
    // Wait for the component to load data and display the search input
    const searchInput = await screen.findByPlaceholderText(/Search for restaurants and food/i, {}, { timeout: 2000 });
    expect(searchInput).toBeInTheDocument();
});

test("Body component displays restaurants after loading", async () => {
    render(
        <Provider store={mockStore}>
            <BrowserRouter>
                <UserContext.Provider value={{ setUserName: mockSetUserName, loggedInUser: "" }}>
                    <Body />
                </UserContext.Provider>
            </BrowserRouter>
        </Provider>
    );
    
    // Wait for restaurants to be displayed
    await waitFor(() => {
        const restaurantCards = screen.queryAllByRole("link");
        expect(restaurantCards.length).toBeGreaterThan(0);
    }, { timeout: 2000 });
});

