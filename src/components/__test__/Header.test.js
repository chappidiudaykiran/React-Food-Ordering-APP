import Header from "../Header";
import { render, screen, fireEvent } from "@testing-library/react";
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

test("Header component renders correctly", () => {
    render(
        <Provider store={mockStore}>
            <BrowserRouter>
                <UserContext.Provider value={{ loggedInUser: "John Doe" }}>
                    <Header />
                </UserContext.Provider>
            </BrowserRouter>
        </Provider>
    );
    
    // Check if navigation links are rendered
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
    
    const aboutLink = screen.getByText("About");
    expect(aboutLink).toBeInTheDocument();
    
    const contactLink = screen.getByText("Contact");
    expect(contactLink).toBeInTheDocument();
    
    const groceryLink = screen.getByText("Grocery");
    expect(groceryLink).toBeInTheDocument();
});

test("Header shows online status", () => {
    render(
        <Provider store={mockStore}>
            <BrowserRouter>
                <UserContext.Provider value={{ loggedInUser: "John Doe" }}>
                    <Header />
                </UserContext.Provider>
            </BrowserRouter>
        </Provider>
    );
    
    // Check if online status is displayed
    const onlineStatus = screen.getByText("Online");
    expect(onlineStatus).toBeInTheDocument();
});

test("Header displays login button and toggles on click", () => {
    render(
        <Provider store={mockStore}>
            <BrowserRouter>
                <UserContext.Provider value={{ loggedInUser: "John Doe" }}>
                    <Header />
                </UserContext.Provider>
            </BrowserRouter>
        </Provider>
    );
    
    // Check if login button is rendered
    const loginButton = screen.getByRole("button", { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.textContent).toBe("Login");
    
    // Click the button
    fireEvent.click(loginButton);
    
    // Check if button text changed to Logout
    expect(loginButton.textContent).toBe("Logout");
});

test("Header displays logged in user name", () => {
    render(
        <Provider store={mockStore}>
            <BrowserRouter>
                <UserContext.Provider value={{ loggedInUser: "Jane Smith" }}>
                    <Header />
                </UserContext.Provider>
            </BrowserRouter>
        </Provider>
    );
    
    // Check if user name is displayed
    const userName = screen.getByText("Jane Smith");
    expect(userName).toBeInTheDocument();
});

test("Header displays cart items count", () => {
    const storeWithItems = configureStore({
        reducer: {
            cart: cartSlice
        },
        preloadedState: {
            cart: {
                items: [
                    { cartItemId: "1", name: "Item 1" },
                    { cartItemId: "2", name: "Item 2" }
                ]
            }
        }
    });
    
    render(
        <Provider store={storeWithItems}>
            <BrowserRouter>
                <UserContext.Provider value={{ loggedInUser: "John Doe" }}>
                    <Header />
                </UserContext.Provider>
            </BrowserRouter>
        </Provider>
    );
    
    // Check if cart count is displayed
    const cartLink = screen.getByText(/Cart \(2 items\)/);
    expect(cartLink).toBeInTheDocument();
});
