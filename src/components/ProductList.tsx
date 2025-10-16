import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PRODUCTS } from "../Products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import type { RootState } from "../redux/store";
import toast from "react-hot-toast";

type ProductListProps = {
  category?: string;
};

const ProductList = ({ category = "All" }: ProductListProps) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleAdd = (item: any) => {
    if (!currentUser) {
      toast.error("Please Login First");
    } else {
      dispatch(addToCart({ userId: currentUser.email, product: item }));
    }
  };

  const filteredProducts =
    category === "All"
      ? PRODUCTS
      : PRODUCTS.filter((item: any) => item.category === category);

  function ErrorFallback({ error, resetErrorBoundary }: any) {
    return (
      <div role="alert" className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Something went wrong in Product List!
        </h2>
        <pre className="text-sm text-gray-700 mb-4">{error.message}</pre>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={resetErrorBoundary}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <>
        <h1 className="text-3xl md:text-4xl text-center font-semibold mt-16 md:mt-20">
          Our Products
        </h1>
        <div className="product-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4 px-2 md:px-8">
          {filteredProducts.map((item, index) => (
            <div
              className="card bg-white shadow-md rounded-lg py-6 px-3 flex flex-col justify-center items-center pt-3 min-h-80 hover:scale-105 transition w-full"
              key={index}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-40 h-40 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-center mb-2">
                {item.title}
              </h3>
              <p className="text-blue-600 font-bold mb-2">$ {item.price}</p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:text-gray-200 font-semibold w-full"
                onClick={() => handleAdd(item)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </>
    </ErrorBoundary>
  );
};

export default React.memo(ProductList);
