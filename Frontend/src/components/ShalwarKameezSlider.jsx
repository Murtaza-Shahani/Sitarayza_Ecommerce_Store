import React, { useState, useEffect } from 'react';
import Image1 from '../assets/images/s1.jpg';
import Image2 from '../assets/images/s2.jpg';
import Image3 from '../assets/images/s30.png';
import Image4 from '../assets/images/C4.jpg';
import Image5 from '../assets/images/c5.jpg';
import Image6 from '../assets/images/W2.jpg';

const images = [Image1, Image2, Image3,Image4,Image5,Image6];

const ShalwarKameezSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 3 ? 0 : prevIndex + 1));
    }, 3000); // Change every 3 seconds

    // Clean up interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 3 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 3 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-5">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <div className="flex transition-all duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Shalwar Kameez ${index + 1}`}
              className="w-1/3 h-80 object-contain mx-auto"
            />
          ))}
        </div>
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
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

export default ShalwarKameezSlider;
