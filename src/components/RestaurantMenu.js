import { useParams } from "react-router-dom";
import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
    const { id } = useParams();
    const [expandedIndex, setExpandedIndex] = useState(null);
    const menuData = useRestaurantMenu(id);

    if (!menuData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin text-6xl mb-4">🍽️</div>
                    <p className="text-lg text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Restaurant Header */}
                <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-3">{menuData.restaurant?.name}</h1>
                    <div className="flex items-center gap-3 text-sm mb-2">
                        <span className="font-semibold" style={{color: '#48c479'}}>
                            ★ {menuData.restaurant?.avgRating}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{menuData.restaurant?.costForTwo}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{menuData.restaurant?.cuisines?.join(", ")}</p>
                    <p className="text-sm text-gray-500">{menuData.restaurant?.location}</p>
                </div>

                {/* Menu Categories (Accordion) */}
                {menuData.menu?.map((category, index) => (
                  <RestaurantCategory
                    key={index}
                    category={category}
                    isOpen={expandedIndex === index}
                    onToggle={() =>
                      setExpandedIndex(expandedIndex === index ? null : index)
                    }
                  />
                ))}
            </div>
        </div>
    );
};

export default RestaurantMenu;