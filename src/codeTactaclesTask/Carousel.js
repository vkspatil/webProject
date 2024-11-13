import React, { useEffect, useRef, useState } from "react";
import img1 from "./slider2/1.webp";
import img2 from "./slider2/6.webp";
import img3 from "./slider2/7.webp";

const Carousel = () => {
  const images = [img1, img2, img3, img1, img2, img3, img1, img2, img3];

  return (
    <div className="bg-black  text-yellow-500">
      <header className="flex justify-center py-4">
        <h1 className="text-3xl font-bold">The Moonshooter Series</h1>
      </header>

      <div className="overflow-x-auto flex gap-6 px-8 snap-x snap-mandatory scrollbar-hide">
        {images.map((img, index) => (
          <div
            key={index}
            className={`carousel-image flex-shrink-0 w-64 h-64 bg-black border-2 border-yellow-500 rounded-lg snap-center transition-transform duration-300`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center py-14 pl-8 lg:px-96">
        <div className="lg:w-1/2 text-center lg:text-left p-3">
          <hr className="border border-yellow-600 my-4" />
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-white">MoonBoxes.io</span> <br />
            <span>your base to purchase NFTS</span>
          </h1>
          <hr className="border border-yellow-600 my-4" />
        </div>
        <div className="lg:w-1/2">
          <p className="text-sm mb-6">
            MoonBoxes.io offers you a complete overview of upcoming, active and
            recent NFT drops. MoonBoxes.io will be home to collectors and
            amazing NFT artists.
          </p>
          <button className="bg-yellow-500 text-black hover:bg-yellow-600 px-4 py-2 rounded-full font-semibold">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
