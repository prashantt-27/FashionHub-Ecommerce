import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { logout } from "../redux/userSlice";

type NavbarProps = {
  onCategorySelect?: (cat: string) => void;
};

const Navbar = ({ onCategorySelect }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const cartState = useSelector((state: RootState) => state.cart);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setIsOpen(false);
    if (onCategorySelect) onCategorySelect(cat);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsOpen(false);
  };

  const cartProduct = currentUser ? cartState[currentUser.email] || [] : [];
  const totalCount = cartProduct.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0
  );

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed top-0 w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200 shadow-md">
                <svg
                  className="w-5 h-5 text-white"
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
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FashionHub
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-2 font-medium text-gray-700">
            <Link to="/">
              <li
                className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedCategory === "All"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-100 hover:text-blue-600"
                }`}
                onClick={() => handleCategoryClick("All")}
              >
                Home
              </li>
            </Link>
            <li
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedCategory === "Mens"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "hover:bg-gray-100 hover:text-blue-600"
              }`}
              onClick={() => handleCategoryClick("Mens")}
            >
              Mens
            </li>
            <li
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedCategory === "Womens"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "hover:bg-gray-100 hover:text-blue-600"
              }`}
              onClick={() => handleCategoryClick("Womens")}
            >
              Womens
            </li>
            <li
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedCategory === "Kids"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "hover:bg-gray-100 hover:text-blue-600"
              }`}
              onClick={() => handleCategoryClick("Kids")}
            >
              Kids
            </li>
          </ul>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-semibold shadow-md">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden xl:block">
                    {currentUser.username}
                  </span>
                </div>
                <button
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2.5 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}

            {/* Cart Button */}
            <Link to="/cart" className="relative group">
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-bold h-6 w-6 flex items-center justify-center shadow-md z-10 animate-pulse">
                  {totalCount > 99 ? "99+" : totalCount}
                </span>
              )}
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform group-hover:scale-105 flex items-center gap-2">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Cart</span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden bg-gradient-to-br from-white via-blue-50/30 to-white border-t border-gray-200 transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {currentUser ? (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-4 border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {currentUser.username}
                    </p>
                    <p className="text-xs text-gray-500">Active Account</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl text-sm hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-md"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl mb-4 hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-md"
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
            >
              Login to Continue
            </button>
          )}

          {/* Cart Button in Mobile */}
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="block w-full mb-4"
          >
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl text-center font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md flex items-center justify-center gap-2">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>View Cart</span>
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-bold h-6 w-6 flex items-center justify-center shadow-md">
                  {totalCount > 99 ? "99+" : totalCount}
                </span>
              )}
            </div>
          </Link>

          {/* Category Navigation */}
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
              Categories
            </p>
            <ul className="flex flex-col space-y-1 text-gray-700 font-medium">
              <Link to="/">
                <li
                  className={`rounded-xl cursor-pointer px-4 py-3 transition-all duration-200 flex items-center justify-between ${
                    selectedCategory === "All"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                      : "hover:bg-gray-50 hover:text-blue-600"
                  }`}
                  onClick={() => handleCategoryClick("All")}
                >
                  <span>Home</span>
                  {selectedCategory === "All" && (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </li>
              </Link>
              <li
                className={`rounded-xl cursor-pointer px-4 py-3 transition-all duration-200 flex items-center justify-between ${
                  selectedCategory === "Mens"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-50 hover:text-blue-600"
                }`}
                onClick={() => handleCategoryClick("Mens")}
              >
                <span>Mens</span>
                {selectedCategory === "Mens" && (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
              <li
                className={`rounded-xl cursor-pointer px-4 py-3 transition-all duration-200 flex items-center justify-between ${
                  selectedCategory === "Womens"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-50 hover:text-blue-600"
                }`}
                onClick={() => handleCategoryClick("Womens")}
              >
                <span>Womens</span>
                {selectedCategory === "Womens" && (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
              <li
                className={`rounded-xl cursor-pointer px-4 py-3 transition-all duration-200 flex items-center justify-between ${
                  selectedCategory === "Kids"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-50 hover:text-blue-600"
                }`}
                onClick={() => handleCategoryClick("Kids")}
              >
                <span>Kids</span>
                {selectedCategory === "Kids" && (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
