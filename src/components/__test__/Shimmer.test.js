import Shimmer from "../Shimmer";
import { render, screen } from "@testing-library/react";

test("Shimmer component renders correctly", () => {
    const { container } = render(<Shimmer />);
    
    // Check if the shimmer containers are rendered
    const shimmerDivs = container.querySelectorAll('.animate-pulse');
    expect(shimmerDivs.length).toBeGreaterThan(0);
    
    // Check if 20 shimmer items are rendered
    const shimmerItems = container.querySelectorAll('.bg-gray-100.border');
    expect(shimmerItems.length).toBeGreaterThanOrEqual(20);
});
