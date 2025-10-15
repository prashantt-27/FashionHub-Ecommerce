import React from "react";

const Hero = () => {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 pt-20">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Build Stunning Websites with Tailwind + React 🚀
          </h1>
          <p className="text-lg text-gray-100">
            Learn how to design beautiful, responsive UIs faster than ever.
          </p>
          <button className="bg-white rounded-lg px-6 py-3 text-blue-600 font-semibold hover:bg-gray-100 transition">
            Start Learning
          </button>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2721/2721297.png"
            alt=""
            className="w-80 md:w-96 animate-bounce"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
