import UserClass from "../UserClass";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock fetch globally before importing UserClass
global.fetch = jest.fn();

test("UserClass component renders and fetches user data", async () => {
    const mockUserData = {
        name: "Uday Kiran",
        location: "Vishakapatnam",
        avatar_url: "https://avatars.githubusercontent.com/u/123456"
    };
    
    global.fetch.mockResolvedValueOnce({
        json: async () => mockUserData
    });
    
    render(<UserClass />);
    
    // Check if the component renders with default data initially
    expect(screen.getByText(/Dummy Name/i)).toBeInTheDocument();
    
    // Wait for the component to fetch and update with real data
    await waitFor(() => {
        expect(screen.getByText("Uday Kiran")).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Check if the location is updated
    expect(screen.getByText("Vishakapatnam")).toBeInTheDocument();
    
    // Check if the avatar image is rendered
    const avatarImg = screen.getByAltText("User Avatar");
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg.src).toBe(mockUserData.avatar_url);
});

afterEach(() => {
    jest.clearAllMocks();
});
