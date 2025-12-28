import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";

const RestaurantCard = ({ res }) => {
    const { loggedInUser } = useContext(UserContext);
    if (!res) return null;
    const name = res?.name || "Restaurant";
    const rating = res?.avgRating ?? res?.avgRatingString ?? "-";
    const cuisines = Array.isArray(res?.cuisines) ? res.cuisines : [];
    const deliveryTime = res?.sla?.deliveryTime ?? res?.slaString ?? "-";
    const costForTwo = res?.costForTwo || "₹350";
    const imageUrl = res?.cloudinaryImageId || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop";

    return (
        <Link to={`/restaurants/${res.id}`} className="block group">
            <div className="bg-gray-100 border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200">
                <div className="relative h-44 overflow-hidden">
                    {res?.promoted && (
                        <div className="absolute top-0 left-0 z-20 pointer-events-none">
                            <div className="bg-gray-200 text-gray-700 uppercase tracking-wide text-[11px] font-semibold px-3 py-1.5 rounded-br-md shadow-sm border border-gray-300">
                                Promoted
                            </div>
                        </div>
                    )}
                    <img 
                        className="w-full h-full object-cover" 
                        src={imageUrl} 
                        alt={name}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div className="hidden absolute inset-0 items-center justify-center bg-gray-100">
                        <span className="text-6xl">🍽️</span>
                    </div>
                </div>
                <div className="p-3">
                    <h3 className="font-semibold text-base text-gray-800 truncate mb-1">{name}</h3>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center gap-1 text-sm font-semibold" style={{color: Number(rating) >= 4 ? '#48c479' : '#db7c38'}}>
                            ★ {rating}
                        </span>
                        <span className="text-gray-400 text-sm">•</span>
                        <span className="text-gray-600 text-sm">{deliveryTime} {typeof deliveryTime === "number" ? "mins" : ""}</span>
                    </div>
                    <p className="text-gray-500 text-sm truncate mb-1">{cuisines.length ? cuisines.join(", ") : "Various Cuisines"}</p>
                    <p className="text-gray-600 text-sm font-medium">{costForTwo}</p>
                    <p className="text-gray-600 text-sm">User: {loggedInUser}</p>
                </div>
            </div>
        </Link>
    );
}

export default RestaurantCard;