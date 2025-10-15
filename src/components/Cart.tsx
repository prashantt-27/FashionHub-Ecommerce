import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteFromCart,
  increseQuantity,
  decreseQuantity,
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
  const cartProduct = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return cartProduct
      .reduce(
        (acc: number, item: CartItem) => acc + item.price * item.quantity,
        0
      )
      .toFixed(2);
  }, [cartProduct]);

  return (
    <div className="px-2 md:px-0">
      <h1 className="text-2xl md:text-3xl mt-16 md:mt-24 text-center font-bold">
        Your Cart
      </h1>

      <div>
        {cartProduct.length > 0 ? (
          cartProduct.map((item: CartItem, index: number) => (
            <div
              key={index}
              className="bg-white shadow-md flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-3 w-full md:w-10/12 mx-auto rounded-lg my-5"
            >
              <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 md:w-32 md:h-36 rounded-lg object-contain"
                />
                <div className="flex flex-col items-center md:items-start w-full">
                  <h2 className="text-lg md:text-2xl my-2 md:my-3 text-center md:text-left">
                    {item.title}
                  </h2>
                  <div className="flex items-center justify-center md:justify-start mb-2">
                    <span className="mr-2">Quantity:</span>
                    <button
                      className="text-center bg-blue-600 text-white px-2 md:px-3 py-1 rounded-lg hover:text-gray-200 font-semibold mx-1"
                      onClick={() => dispatch(decreseQuantity(item.id))}
                    >
                      -
                    </button>
                    <span className="mx-1">{item.quantity}</span>
                    <button
                      className="text-center bg-blue-600 text-white px-2 md:px-3 py-1 rounded-lg hover:text-gray-200 font-semibold mx-1"
                      onClick={() => dispatch(increseQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-blue-600 font-bold mb-2">
                    Price: ${item.price}
                  </p>
                </div>
              </div>

              <div className="mt-3 md:mt-0">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:text-gray-200 font-semibold w-full md:w-auto"
                  onClick={() => dispatch(deleteFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white shadow-md flex justify-center items-center px-4 md:px-6 py-3 w-full md:w-10/12 mx-auto rounded-lg my-5">
            <p className="text-center w-full">No Product Found</p>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col md:flex-row justify-between items-center w-full md:w-10/12 mx-auto gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:text-gray-200 font-semibold w-full md:w-auto"
          onClick={() => navigate("/")}
        >
          Back To Product
        </button>

        {cartProduct.length > 0 && (
          <h2 className="text-lg md:text-2xl font-semibold text-center md:text-right w-full md:w-auto">
            Total Amount : ${totalPrice}
          </h2>
        )}
      </div>
    </div>
  );
};

export default Cart;
