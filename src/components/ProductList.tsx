import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PRODUCTS } from "../Products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import type { RootState } from "../redux/store";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";

type ProductListProps = {
  category?: string;
};

const PAGE_SIZE = 8;

const ProductList = ({ category = "All" }: ProductListProps) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const filteredProducts =
    category === "All"
      ? PRODUCTS
      : PRODUCTS.filter((item: any) => item.category === category);

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
  }, [category]);

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
      toast.error("Please Login First");
    } else {
      dispatch(addToCart({ userId: currentUser.email, product: item }));
    }
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
        {/* Header Section */}
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

        {/* Products Grid */}
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
                  {/* Product Image Container */}
                  <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="relative w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 z-10"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors duration-200">
                      {item.title}
                    </h3>

                    {/* Price and Badge */}
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

                    {/* Add to Cart Button */}
                    <button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                      onClick={() => handleAdd(item)}
                    >
                      Add To Cart
                    </button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 border-2 border-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="relative">
                <div className="animate-spin h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                <div className="absolute inset-0 animate-ping h-12 w-12 border-4 border-blue-400 rounded-full opacity-20"></div>
              </div>
            </div>
          )}

          {/* End of List Message */}
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

          {/* Empty State */}
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
              <p className="text-gray-600">
                Try adjusting your filters or check back later
              </p>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(ProductList);
