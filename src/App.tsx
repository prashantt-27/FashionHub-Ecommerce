import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";

const Cart = lazy(() => import("./components/Cart"));
const ProductList = lazy(() => import("./components/ProductList"));
const LoginForm = lazy(() => import("./authentication/LoginForm"));
const SignIn = lazy(() => import("./authentication/SignIn"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));

const App = () => {
  const [category, setCategory] = useState<string>("All");

  function ErrorFallback({ error, resetErrorBoundary }: any) {
    return (
      <div role="alert" className="p-8 text-center mt-30">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Something went wrong!
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
    <div className="font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Suspense
          fallback={<div className="text-center mt-10">Loading...</div>}
        >
          <Navbar onCategorySelect={setCategory} />
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <ProductList category={category} />
                </ErrorBoundary>
              }
            ></Route>
            <Route path="/product/:id" element={<ProductDetails />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/sign" element={<SignIn />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
