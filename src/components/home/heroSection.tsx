import { INTER, QUICKSAND } from "@/app/fonts";
import React from "react";
import Button from "../globals/button";
import Image from "next/image";
import plant from "@/app/images/plant.png";
import { Icon } from "@iconify/react";
import { Leaf } from "../Icons";
const HeroSection = () => {
  return (
    <>
      <div className="container mx-auto px-10 flex items-center ">
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mt-10"># Ornamentalplant</h2>
          <h1
            className={"text-8xl font-semibold capitalize " + INTER.className}
          >
            Verious Indor Plants and Flowers shop
          </h1>
          <p className="w-10/12 mt-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste
            doloremque ad corrupti, libero earum nesciunt magnam enim unde dolor
            saepe!
          </p>
          <div className="mt-5 flex gap-5">
            <Button
              text="Explore More"
              className="bg-primary text-white rounded"
            />
            <Button
              text="Get Started"
              className="border text-primary bg-white rounded"
            />
          </div>
        </div>
        <div className="w-1/2 flex px-20 items-center justify-center relative h-[600px]">
          <div className="w-[300px] h-[100px] px-4 bg-white/20 shadow-xl rounded-xl backdrop-blur-md border absolute z-10 left-0 bottom-24 flex gap-3 items-center">
            <div className="bg-white h-[75px] w-[75px] flex items-center overflow-hidden justify-center relative rounded-md shadow-md shadow-black/10">
              <span className="z-10">
                <Leaf />
              </span>
              <div className="w-8 h-8 absolute bg-ternary blur-lg"></div>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Best Sell Indoor Plant</h1>
              <p>Lorem ipsum dolor sit</p>
            </div>
          </div>
          <Image
            src={plant}
            className="w-full object-cover -translate-y-12"
            alt="plant"
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
