import React, { useEffect } from "react";
import SideBar from "../sideBar";
import chef from "@/app/images/chef.webp";
import Image from "next/image";
interface pageProps {
  component: React.ReactNode;
}
const Wrapper: React.FC<pageProps> = ({ component }) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full flex flex-col justify-between min-h-screen h-fit">
        <div>
          <div className="h-fit w-full flex justify-between items-center p-5 border-b mb-10">
            <h1 className="text-xl font-semibold">Welcome !</h1>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white shadow-lg border overflow-hidden">
                <Image
                  src={chef}
                  className="w-full h-full object-cover"
                  alt="chef"
                />
              </div>
              <h1 className="text-lg font-semibold">Admin</h1>
            </div>
          </div>
          {component}
        </div>
        <div className="px-5 my-8">
          All rights reserved by &copy; brothers-pizza.com
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
