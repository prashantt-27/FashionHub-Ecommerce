import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import type { RootState } from "../redux/store";
import { useMemo } from "react";

type CartItem = {
  id: string;
  title: string;
  quantity: number;
  image: string;
  price: number;
};

const Cart = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const cartState = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get only the logged-in user's cart
  const cartProduct: CartItem[] = currentUser
    ? cartState[currentUser.email] || []
    : [];

  const totalPrice = useMemo(() => {
    return cartProduct
      .reduce(
        (acc: number, item: CartItem) => acc + item.price * item.quantity,
        0
      )
      .toFixed(2);
  }, [cartProduct]);

  const totalItems = useMemo(() => {
    return cartProduct.reduce(
      (acc: number, item: CartItem) => acc + item.quantity,
      0
    );
  }, [cartProduct]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-100">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Login Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please login to view your cart and continue shopping
          </p>
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={() => navigate("/login")}
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent mb-3">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {cartProduct.length > 0
              ? `${totalItems} ${
                  totalItems === 1 ? "item" : "items"
                } in your cart`
              : "Your cart is empty"}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {cartProduct.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cartProduct.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row p-4 sm:p-6 gap-4">
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div className="w-32 h-32 sm:w-36 sm:h-36 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center p-4 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                          {item.title}
                        </h2>

                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                            ${item.price}
                          </span>
                          <span className="text-sm text-gray-500">
                            per item
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm font-medium text-gray-700">
                            Quantity:
                          </span>
                          <div className="flex items-center bg-gray-100 rounded-xl p-1">
                            <button
                              className="w-9 h-9 flex items-center justify-center bg-white text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() =>
                                dispatch(
                                  decreaseQuantity({
                                    userId: currentUser.email,
                                    productId: item.id,
                                  })
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              className="w-9 h-9 flex items-center justify-center bg-white text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-bold shadow-sm"
                              onClick={() =>
                                dispatch(
                                  increaseQuantity({
                                    userId: currentUser.email,
                                    productId: item.id,
                                  })
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            Subtotal:
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center justify-center sm:justify-start gap-2">
                      <button
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        onClick={() =>
                          dispatch(
                            deleteFromCart({
                              userId: currentUser.email,
                              productId: item.id,
                            })
                          )
                        }
                        title="Remove item"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Items ({totalItems})</span>
                    <span className="font-semibold">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      ${totalPrice}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 mb-3">
                  Proceed to Checkout
                </button>

                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                  onClick={() => navigate("/")}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center border border-gray-100">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added anything to your cart yet. Start
                shopping to find great products!
              </p>
              <button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-2"
                onClick={() => navigate("/")}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Start Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
