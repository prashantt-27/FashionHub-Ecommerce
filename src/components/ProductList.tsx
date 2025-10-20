import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PRODUCTS } from "../Products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import type { RootState } from "../redux/store";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

type ProductListProps = {
  category?: string;
};

const PAGE_SIZE = 8;

const ProductList = ({ category = "All" }: ProductListProps) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [showFilters, setShowFilters] = useState(false);

  const getFilteredProducts = () => {
    let products =
      category === "All"
        ? PRODUCTS
        : PRODUCTS.filter((item: any) => item.category === category);

    if (searchQuery) {
      products = products.filter((item: any) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    products = products.filter(
      (item: any) =>
        item.price >= priceRange.min && item.price <= priceRange.max
    );

    switch (sortBy) {
      case "price-low":
        products = [...products].sort((a: any, b: any) => a.price - b.price);
        break;
      case "price-high":
        products = [...products].sort((a: any, b: any) => b.price - a.price);
        break;
      case "name-asc":
        products = [...products].sort((a: any, b: any) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "name-desc":
        products = [...products].sort((a: any, b: any) =>
          b.title.localeCompare(a.title)
        );
        break;
      default:
        break;
    }

    return products;
  };

  const filteredProducts = getFilteredProducts();

  const [displayedProducts, setDisplayedProducts] = useState(
    filteredProducts.slice(0, PAGE_SIZE)
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, PAGE_SIZE));
    setPage(1);
  }, [category, searchQuery, sortBy, priceRange]);

  useEffect(() => {
    if (inView && displayedProducts.length < filteredProducts.length) {
      loadMore();
    }
  }, [inView]);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newProducts = filteredProducts.slice(0, nextPage * PAGE_SIZE);
      setDisplayedProducts(newProducts);
      setPage(nextPage);
      setLoading(false);
    }, 1000);
  };

  const handleAdd = (item: any) => {
    if (!currentUser) {
      console.log;
      toast.error("Please Login First");
    } else {
      dispatch(addToCart({ userId: currentUser.email, product: item }));
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSortBy("default");
    setPriceRange({ min: 0, max: 10000 });
  };

  function ErrorFallback({ error, resetErrorBoundary }: any) {
    return (
      <div
        role="alert"
        className="flex items-center justify-center min-h-screen p-4"
      >
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Oops! Something Went Wrong
          </h2>
          <p className="text-sm text-gray-600 mb-6 bg-gray-50 rounded-lg p-3 font-mono">
            {error.message}
          </p>
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={resetErrorBoundary}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
        <div className="pt-16 pb-8 md:pt-24 md:pb-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent mb-4">
              Our Products
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Discover our curated collection of premium products
            </p>
            {category !== "All" && (
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                {category}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center justify-center px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition duration-200"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters
              </button>
            </div>

            <div className={`${showFilters ? "block" : "hidden"} sm:block`}>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Sort Dropdown */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-200 font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {(searchQuery ||
              sortBy !== "default" ||
              priceRange.min > 0 ||
              priceRange.max < 10000) && (
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600 font-medium">
                  Active Filters:
                </span>
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-2 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {sortBy !== "default" && (
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Sort: {sortBy}
                    <button
                      onClick={() => setSortBy("default")}
                      className="ml-2 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {(priceRange.min > 0 || priceRange.max < 10000) && (
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Price: ${priceRange.min} - ${priceRange.max}
                    <button
                      onClick={() => setPriceRange({ min: 0, max: 10000 })}
                      className="ml-2 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
              Showing {displayedProducts.length} of {filteredProducts.length}{" "}
              products
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {displayedProducts.map((item, index) => {
              const isLast = index === displayedProducts.length - 1;
              return (
                <div
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  key={item.id}
                  ref={isLast ? ref : null}
                >
                  <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="relative w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 z-10"
                    />
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors duration-200">
                      {item.title}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-baseline">
                        <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                          ${item.price}
                        </span>
                      </div>
                      <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        In Stock
                      </div>
                    </div>

                    <button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                      onClick={() => handleAdd(item)}
                    >
                      Add To Cart
                    </button>

                    <button
                      className="mt-3 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      View Product
                    </button>
                  </div>

                  <div className="absolute inset-0 border-2 border-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="relative">
                <div className="animate-spin h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                <div className="absolute inset-0 animate-ping h-12 w-12 border-4 border-blue-400 rounded-full opacity-20"></div>
              </div>
            </div>
          )}

          {!loading &&
            displayedProducts.length >= filteredProducts.length &&
            filteredProducts.length > 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-full">
                  <svg
                    className="w-5 h-5 text-gray-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">
                    You've reached the end
                  </span>
                </div>
              </div>
            )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(ProductList);
