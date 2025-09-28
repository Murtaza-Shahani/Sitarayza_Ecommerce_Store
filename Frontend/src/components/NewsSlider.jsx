import React, { useState, useEffect } from 'react';

const newsItems = [
  {
    id: 1,
    headline: "❄️ New Winter Collection Now Live! 40% OFF + Free Shipping 🚚",
    image: "https://via.placeholder.com/100x100.png?text=Winter+Collection",
  },
  {
    id: 2,
    headline: "🧥 Introducing DNAM Jacket – Premium Quality, Stylish Design!",
    image: "https://via.placeholder.com/100x100.png?text=DNAM+Jacket",
  },
  {
    id: 3,
    headline: "🎉 Join Us for Our Annual Sale – Up to 70% OFF!",
    image: "https://via.placeholder.com/100x100.png?text=Annual+Sale",
  },
];

const NewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // Auto slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <div className="flex transition-all duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {newsItems.map((news) => (
            <div key={news.id} className="flex items-center justify-between w-full px-4 py-2 space-x-4 bg-gray-100">
              <img src={news.image} alt={news.headline} className="w-16 h-16 object-cover rounded-full" />
              <span className="text-xl font-semibold text-blue-600">{news.headline}</span>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full"
        >
          &lt;
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full"
        >
          &gt;
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-white'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSlider;
