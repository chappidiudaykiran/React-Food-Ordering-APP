import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
const RestaurantCategory = ({ category, isOpen, onToggle }) => {
  if (!category) return null;

  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  }


  return (
    <div className="bg-gray-100 border border-gray-300 shadow-sm mb-4 rounded">
      <button
        type="button"
        className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-200 transition-colors"
        onClick={onToggle}
        aria-expanded={Boolean(isOpen)}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-gray-800">{category.category}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
            {Array.isArray(category.items) ? category.items.length : 0} items
          </span>
        </div>
        <span
          className={`text-gray-500 transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="p-6 pt-4 space-y-6">
          {category.items?.map((item) => {
            const imageUrl = item.image;

            return (
            <div
              key={item.id}
              className="flex justify-between items-start pb-6 border-b last:border-0 last:pb-0 gap-4"
            >
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-2">
                  <span
                    className="text-xs mt-1"
                    style={{ color: item.isVeg ? "#0f8a65" : "#e43b4f" }}
                  >
                    {item.isVeg ? "🟢" : "🔴"}
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-800 text-base">{item.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-2">₹{item.price}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 w-32">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-32 h-24 object-cover rounded border border-gray-200 shadow-sm"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-32 h-24 rounded border border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400 bg-gray-50">
                    No image
                  </div>
                )}
                <button className="w-full px-4 py-2 bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors text-sm uppercase rounded shadow-md cursor-pointer"
                  onClick={() => handleAddItem(item)}>
                Add to Cart
                </button>
              </div>
            </div>
          );
          })}
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;