import React, { useEffect, useState } from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import img1 from "./slider1/5.webp";
import img2 from "./slider1/2.webp";
import img3 from "./slider1/3.webp";
import astro from "./images/astro_painter.png";
import Carousel from "./Carousel";
import { Tooltip } from "@mui/material";

const MainPage = () => {
  const images = [img1, img2, img3];

  const [currentImage, setCurrentImage] = useState(images[0]);

  const [selected, setSelected] = useState("moonshot");

  const handleFooterClick = (section) => {
    setSelected(section);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const currentIndex = images.indexOf(prev);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 3000); // Change image every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-11 min-h-screen bg-yellow-500 text-yellow-500 pl-14 font-orbitron">
          <header className="bg-yellow-500 text-black flex items-center relative">
            {/* Left-aligned Section */}
            <div className="font-semibold text-xl py-1">
              <span className="text-white">MOON</span>
              <span>BOXES</span>
            </div>

            {/* Centered Navigation */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-yellow-500 clip-trapezoid w-[400px] h-[40px] flex items-center justify-center">
              <nav>
                <div className="flex justify-around gap-x-5">
                  <Tooltip title="Back">
                    <button className="hover:bg-yellow-600 rounded-full">
                      <ArrowCircleLeftOutlinedIcon />
                    </button>
                  </Tooltip>
                  <Tooltip title="Recent, live and upcoming drives.">
                    <button className="hover:bg-yellow-600 rounded-full">
                      <BubbleChartOutlinedIcon />
                    </button>{" "}
                  </Tooltip>
                  <Tooltip title="This is your wallet inventory.An overview of all NFTs you received out of the moon boxes">
                    <button className="hover:bg-yellow-600 rounded-full">
                      <FolderOpenOutlinedIcon />
                    </button>
                  </Tooltip>
                  <Tooltip title="This is history overview of your nfts">
                    <button className="hover:bg-yellow-600 rounded-full">
                      <UpdateOutlinedIcon />
                    </button>
                  </Tooltip>
                  <Tooltip title="This is info overview of your nft">
                    <button className="hover:bg-yellow-600 rounded-full">
                      <InfoOutlinedIcon />
                    </button>
                  </Tooltip>
                  <Tooltip title="This is rewards overview of your nft">
                    <button className="hover:bg-yellow-600 rounded-full">
                      <AcUnitIcon />
                    </button>
                  </Tooltip>
                </div>
              </nav>
            </div>
          </header>

          <main className="bg-black max-h-screen overflow-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center py-32 pl-8 lg:px-24 xl:px-48">
              <div className="lg:w-1/2 text-center lg:text-left p-3">
                <hr className="border border-yellow-600 my-4" />
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  <span className="text-white">Buy MoonBoxes</span> <br />
                  <span>and expand your NFT collection</span>
                </h1>
                <hr className="border border-yellow-600 my-4" />

                <p className="text-sm mb-6">
                  Buying MoonBoxes is a unique way to acquire NFTs and build
                  your collection. It is built on the Binance Smart Chain,
                  MoonRiver, Polygon, Ethereum, and DogeChain. Only available on{" "}
                  <span className="underline text-white">MoonBoxes.io</span>.
                </p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-bold">
                  Buy A MoonBox
                </button>
              </div>
              <div className="lg:w-1/2">
                <img
                  src={currentImage}
                  alt="MoonBox NFT"
                  className="w-full max-w-sm mx-auto lg:mx-0 rounded-lg shadow-lg transition-all duration-1000 ease-in-out" // Smooth transition
                />
              </div>
            </div>

            <div>
              <Carousel />
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center py-28 pl-8 lg:px-24 xl:px-48">
              <div className="lg:w-1/2 text-center lg:text-left p-3">
                <hr className="border border-yellow-600 my-4" />
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  <span className="text-white">Call for artists!</span> <br />
                  <span>
                    Applications are open for all artists and creators
                  </span>
                </h1>
                <hr className="border border-yellow-600 my-4" />

                <button className="border border-yellow-500 text-yellow-500 px-6 py-2 rounded-full font-bold m-2">
                  Contact Us
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-bold">
                  Application Form
                </button>
              </div>
              <div className="lg:w-1/2">
                <img
                  src={astro}
                  alt="MoonBox NFT"
                  className="w-full max-w-sm mx-auto lg:mx-0 rounded-lg shadow-lg"
                />
              </div>
            </div>
          </main>

          <footer className="text-yellow-500 fixed bottom-0 w-full lg:w-[88%]">
            <div className="bg-yellow-500 w-full">
              <div className="grid grid-cols-8 items-center bg-black pl-6">
                <div
                  className={`col-span-1 -ml-[25px] h-12 flex items-center justify-center cursor-pointer transition-all ${"bg-yellow-500 text-black"}`}
                  style={{
                    clipPath: "polygon(0 0%, 0 103%, 68% 108px, 0% 0px)",
                  }}
                  onClick={() => handleFooterClick("tier")}
                >
                  <h4 className="text-sm font-bold">TIER</h4>
                </div>
                <div
                  className={`col-span-2 h-12 flex items-center justify-center cursor-pointer transition-all ${
                    selected === "tier"
                      ? "bg-yellow-500 text-black"
                      : "border border-yellow-500 bg-black"
                  }`}
                  style={{
                    clipPath: "polygon(0 100%, 89% 100%, 100% 0, 13% 0)",
                  }}
                  onClick={() => handleFooterClick("tier")}
                >
                  <h4 className="text-sm font-bold">TIER</h4>
                </div>
                <div
                  className={`col-span-2 -ml-8 h-12 flex items-center pl-14 cursor-pointer transition-all ${
                    selected === "moonshot"
                      ? "bg-yellow-500 text-black"
                      : "bg-black border border-yellow-500"
                  }`}
                  style={{
                    clipPath: "polygon(0px 100%, 70% 100%, 58% 0px, 12% 0px)",
                  }}
                  onClick={() => handleFooterClick("moonshot")}
                >
                  <h4 className="text-sm font-bold">MOONSHOT BALANCE</h4>
                </div>

                <div
                  className={`col-span-2 -ml-[150px] pl-[111px] h-12 flex items-center cursor-pointer transition-all ${
                    selected === "nfts"
                      ? "bg-yellow-500 text-black"
                      : "border border-yellow-500 bg-black"
                  }`}
                  style={{
                    clipPath: "polygon(12% 100%, 70% 100%, 58% 0px, 0% 0px)",
                  }}
                  onClick={() => handleFooterClick("nfts")}
                >
                  <h4 className="text-sm font-bold">TOTAL NFTs</h4>
                </div>
                <div
                  className={`col-span-1 -mr-[25px] h-12 flex items-center justify-center cursor-pointer transition-all ${"bg-yellow-500 text-black"}`}
                  style={{
                    clipPath:
                      "polygon(-2px 100%, 89% 100%, 89% 0px, 15% 117px)",
                  }}
                  onClick={() => handleFooterClick("tier")}
                >
                  <h4 className="text-sm font-bold">TIER</h4>
                </div>
              </div>
            </div>
          </footer>

          {/* Sidebar (Aside) */}
          <aside className="absolute top-0 right-0 h-full w-16 bg-yellow-500 border border-l border-black flex flex-col items-center justify-start space-y-8 text-black gap-2">
            <div className="bg-yellow-600 w-full text-center py-1">
              <FolderOpenIcon />
            </div>
            <button className="transform -rotate-90 hover:text-white">
              Tokenomics
            </button>
            <hr className="text-black border border-black w-8" />
            <button className="transform -rotate-90 hover:text-white">
              MoonSea
            </button>
            <hr className="text-black border border-black w-8" />

            <button className="transform -rotate-90 hover:text-white">
              Moonshot
            </button>
          </aside>
        </div>
        <div className="col-span-1 min-h-screen bg-yellow-500"></div>
      </div>
    </>
  );
};

export default MainPage;
