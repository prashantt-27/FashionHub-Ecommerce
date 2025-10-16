import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import type { RootState } from "../redux/store";
import { logout } from "../redux/userSlice";

type NavbarProps = {
  onCategorySelect?: (cat: string) => void;
};

const Navbar = ({ onCategorySelect }: NavbarProps) => {
  const [showLogin, setShowLogin] = useState(false);
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
  };

  const cartProduct = currentUser ? cartState[currentUser.email] || [] : [];
  const totalCount = cartProduct.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0
  );

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
              Ecommerce Store
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-8 font-medium text-gray-700">
            <Link to="/">
              <li
                className={`hover:text-blue-600 cursor-pointer transition-colors ${
                  selectedCategory === "All" ? "text-blue-600 font-bold" : ""
                }`}
                onClick={() => handleCategoryClick("All")}
              >
                Home
              </li>
            </Link>
            <li
              className={`hover:text-blue-600 cursor-pointer transition-colors ${
                selectedCategory === "Mens" ? "text-blue-600 font-bold" : ""
              }`}
              onClick={() => handleCategoryClick("Mens")}
            >
              Mens
            </li>
            <li
              className={`hover:text-blue-600 cursor-pointer transition-colors ${
                selectedCategory === "Womens" ? "text-blue-600 font-bold" : ""
              }`}
              onClick={() => handleCategoryClick("Womens")}
            >
              Womens
            </li>
            <li
              className={`hover:text-blue-600 cursor-pointer transition-colors ${
                selectedCategory === "Kids" ? "text-blue-600 font-bold" : ""
              }`}
              onClick={() => handleCategoryClick("Kids")}
            >
              Kids
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {currentUser ? (
              <>
                {/* Profile Circle */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold cursor-pointer">
                  {currentUser.username.charAt(0).toUpperCase()}
                </div>

                {/* Logout Button */}
                <button
                  className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm sm:text-base"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm sm:text-base"
                onClick={() => setShowLogin(true)}
              >
                <span
                  className="hidden sm:inline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
                <span className="sm:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
              </button>
            )}

            {showLogin && (
              <Suspense
                fallback={<div className="text-center mt-10">Loading...</div>}
              ></Suspense>
            )}

            {/* Cart Button */}
            <Link to="/cart" className="relative">
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs font-bold h-5 w-5 flex items-center justify-center z-10">
                  {totalCount > 99 ? "99+" : totalCount}
                </span>
              )}
              <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base">
                <span className="hidden sm:inline">Cart</span>
                <span className="sm:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
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
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="flex flex-col space-y-1 py-4 text-gray-700 font-medium">
            <Link to="/">
              <li
                className={`hover:bg-gray-50 hover:text-blue-600 cursor-pointer px-4 py-3 rounded-lg transition-colors ${
                  selectedCategory === "All"
                    ? "text-blue-600 font-bold bg-blue-50"
                    : ""
                }`}
                onClick={() => handleCategoryClick("All")}
              >
                Home
              </li>
            </Link>
            <li
              className={`hover:bg-gray-50 hover:text-blue-600 cursor-pointer px-4 py-3 rounded-lg transition-colors ${
                selectedCategory === "Mens"
                  ? "text-blue-600 font-bold bg-blue-50"
                  : ""
              }`}
              onClick={() => handleCategoryClick("Mens")}
            >
              Mens
            </li>
            <li
              className={`hover:bg-gray-50 hover:text-blue-600 cursor-pointer px-4 py-3 rounded-lg transition-colors ${
                selectedCategory === "Womens"
                  ? "text-blue-600 font-bold bg-blue-50"
                  : ""
              }`}
              onClick={() => handleCategoryClick("Womens")}
            >
              Womens
            </li>
            <li
              className={`hover:bg-gray-50 hover:text-blue-600 cursor-pointer px-4 py-3 rounded-lg transition-colors ${
                selectedCategory === "Kids"
                  ? "text-blue-600 font-bold bg-blue-50"
                  : ""
              }`}
              onClick={() => handleCategoryClick("Kids")}
            >
              Kids
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
