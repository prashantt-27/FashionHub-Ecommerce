import React from "react";

const Features = () => {
  const features = [
    {
      title: "Fast Development ⚡",
      desc: "Build modern UIs quickly with pre-built utility classes.",
    },
    {
      title: "Responsive Design 📱",
      desc: "Your website looks perfect on any device automatically.",
    },
    {
      title: "Reusable Components 🔁",
      desc: "Create consistent UI elements across your project.",
    },
  ];

  return (
    <>
      <section className="bg-gray-100 py-20 px-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Why Choose Tailwind?
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 max-w-sm hover:scale-105 transition"
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Features;
