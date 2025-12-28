import { useState, useEffect, useContext } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { MOCK_RESTAURANTS } from "../utils/mockData";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "./UserContext";


const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const { setUserName } = useContext(UserContext);

  const handleUsernameUpdate = () => {
    if (searchUsername.trim()) {
      setUserName(searchUsername);
      setSearchUsername("");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Simulating API call delay with mock data
    setTimeout(() => {
      setAllRestaurants(MOCK_RESTAURANTS);
      setFilteredRestaurants(MOCK_RESTAURANTS);
    }, 500);
  };


  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-10 bg-white shadow-md max-w-md">
          <div className="text-6xl mb-4">📡</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">No Internet Connection</h1>
          <p className="text-gray-600">Please check your connection and try again.</p>
        </div>
      </div>
    );
  }
  return allRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <div className="flex gap-3 flex-1 min-w-[400px] items-center">
            <input 
              type="text" 
              placeholder="Search for restaurants and food" 
              className="flex-1 px-5 py-3 border border-gray-300 focus:outline-none focus:border-[#fc8019] transition-colors text-gray-700" 
              value={searchText} 
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button 
              className="px-8 py-3 bg-[#fc8019] text-white font-semibold hover:bg-[#e87316] transition-colors" 
              onClick={() => {
                const query = searchText.trim().toLowerCase();
                if (!query) {
                  setFilteredRestaurants(allRestaurants);
                  return;
                }
                const results = allRestaurants.filter((res) =>
                  (res?.name || "").toLowerCase().includes(query)
                );
                setFilteredRestaurants(results);
              }}
            >
              Search
            </button>
            <input 
              type="text" 
              placeholder="Update Username"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUsernameUpdate()}
              className="px-5 py-3 border border-gray-300 focus:outline-none focus:border-[#fc8019] transition-colors text-gray-700 placeholder-gray-400" 
            />
            <button 
              onClick={handleUsernameUpdate}
              className="px-6 py-3 bg-[#fc8019] text-white font-semibold hover:bg-[#e87316] transition-colors"
            >
              Update User
            </button>
          </div>
          <button
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium hover:border-[#fc8019] hover:text-[#fc8019] transition-colors"
            onClick={() => {
              const filteredList = allRestaurants.filter(
                (res) => (Number(res?.avgRating) || 0) >= 4.3
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Top Rated
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRestaurants.map((res) => (
            <RestaurantCard key={res.id || res.uuid || Math.random()} res={res} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Body;
