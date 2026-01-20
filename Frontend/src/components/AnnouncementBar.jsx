const AnnouncementBar = () => {
  const items = [
    "🔥 Flat 40% OFF on Winter Collection",
    "🚚 Free Shipping on Orders Above $50",
    "🆕 New Arrivals Just Dropped",
    "⚡ Limited Time Offers – Shop Now",
  ];

  return (
    <div className="w-full bg-black text-white overflow-hidden">
      <div className="relative flex overflow-hidden">
        {/* First set */}
        <div className="animate-marquee flex gap-12 whitespace-nowrap py-3 flex-none">
          {items.map((text, index) => (
            <span 
              key={`first-${index}`} 
              className="text-sm font-medium flex items-center"
            >
              {text}
              <span className="mx-12">•</span>
            </span>
          ))}
        </div>
        
        {/* Second set for seamless loop */}
        <div className="animate-marquee flex gap-12 whitespace-nowrap py-3 flex-none">
          {items.map((text, index) => (
            <span 
              key={`second-${index}`} 
              className="text-sm font-medium flex items-center"
            >
              {text}
              <span className="mx-12">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;