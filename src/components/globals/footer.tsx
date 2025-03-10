import React, { useState } from "react";
import Logo from "./logo";

const Footer = () => {
  return (
    <>
      <div className=" bg-primary mt-10">
        <div className="container mx-auto px-10 text-white flex justify-between items-center gap-20 p-10 rounded-t-xl">
          <div className="w-[300px]">
            <Logo/>
            <p className="mt-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Necessitatibus velit assumenda quo ipsa, maiores recusandae facere
              debitis ipsam inventore reprehenderit.
            </p>
          </div>
          <div className="flex gap-20">
            <div className="w-[300px]">
              <h1 className="text-2xl font-bold flex gap-2 items-center">
                <span>Pages</span>
                <span className="w-[50px] h-[5px] bg-white rounded-md"></span>
                <span className="w-[10px] h-[5px] bg-white rounded-md"></span>
              </h1>
              <ul>
                <li className="underline">FAQs</li>
                <li className="underline">About us</li>
                <li className="underline">Contact us</li>
              </ul>
            </div>
            <div className="w-[300px]">
              <h1 className="text-2xl font-bold flex gap-2 items-center">
                <span>Contact Us</span>
                <span className="w-[50px] h-[5px] bg-white rounded-md"></span>
                <span className="w-[10px] h-[5px] bg-white rounded-md"></span>
              </h1>
              <ul>
                <li>0000 0000000</li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
                  deserunt!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
