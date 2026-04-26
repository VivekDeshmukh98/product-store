import  { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export const Cart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Cart must be used inside CartProvider");
  }

  const { cart, setCart } = context;

  // ✅ Increase quantity
  const handleIncrease = (itemId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  // ✅ Decrease quantity (remove if reaches 0)
  const handleDecrease = (itemId: number) => {
    const updatedCart = cart
      .map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  // ✅ Remove item
  const handleRemove = (itemId: number) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  // ✅ Total (safe calculation)
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Total quantity (better UX than cart.length)
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🛒 Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {totalItems === 0
              ? "Your cart is empty"
              : `${totalItems} item${totalItems !== 1 ? "s" : ""} in cart`}
          </p>
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
            <p className="text-2xl text-gray-500 dark:text-gray-400 mb-6">
              Your cart is empty.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                >
                  <div className="flex gap-6">
                    
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain rounded-lg bg-gray-100 dark:bg-gray-700"
                    />

                    <div className="grow">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex justify-between mt-2">
                        <span className="text-xl font-bold text-blue-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="mt-4 flex justify-between items-center border-t pt-4">
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-600 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems})</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded">
                  Checkout
                </button>

                <Link
                  to="/"
                  className="block text-center mt-2 text-blue-500"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};