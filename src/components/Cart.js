import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../utils/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    const handleRemoveItem = (cartItemId) => {
        dispatch(removeItem({ cartItemId }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">Your Cart</h1>
                <div>
                    {cartItems.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-lg shadow">
                            <p className="text-gray-600 text-lg">Your cart is empty.</p>
                            <p className="text-gray-400 text-sm mt-2">Add items to get started!</p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {cartItems.map((item) => {
                                const imageUrl = item.image;
                                return (
                                    <div
                                        key={item.cartItemId}
                                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                                    >
                                        <div className="flex flex-col md:flex-row gap-6 p-6">
                                            {/* Image Section */}
                                            <div className="flex-shrink-0 w-full md:w-48">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={item.name}
                                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-400 bg-gray-50">
                                                        No image
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content Section */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-start gap-3 mb-3">
                                                        <span
                                                            className="text-2xl"
                                                            style={{ color: item.isVeg ? "#0f8a65" : "#e43b4f" }}
                                                        >
                                                            {item.isVeg ? "🟢" : "🔴"}
                                                        </span>
                                                        <div className="flex-1">
                                                            <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>
                                                            <p className="text-gray-600 text-sm mt-2 leading-relaxed">{item.description}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price and Button Section */}
                                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                                                    <p className="text-3xl font-bold text-orange-600">₹{item.price}</p>
                                                    <button
                                                        className="px-6 py-3 bg-red-500 text-white font-semibold hover:bg-red-600 active:scale-95 transition-all duration-200 text-sm uppercase rounded-lg shadow-md hover:shadow-lg"
                                                        onClick={() => handleRemoveItem(item.cartItemId)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Cart Summary */}
                            <div className="bg-white rounded-xl shadow-md p-6 mt-8 border-t-4 border-orange-500">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Total Items: {cartItems.length}</h3>
                                    <p className="text-2xl font-bold text-orange-600">
                                        ₹{cartItems.reduce((sum, item) => sum + item.price, 0)}
                                    </p>
                                </div>
                                <button
                                    onClick={handleClearCart}
                                    className="w-full px-6 py-3 bg-red-500 text-white font-semibold hover:bg-red-600 active:scale-95 transition-all duration-200 text-sm uppercase rounded-lg shadow-md hover:shadow-lg"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Cart;