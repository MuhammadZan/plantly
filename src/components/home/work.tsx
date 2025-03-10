import Image from "next/image";
import React from "react";
import p8 from "@/app/images/plant8.png";
import { BRILLANT_REGULAR } from "@/app/fonts";
const Work = () => {
  return (
    <div className="mt-16">
      <h1 className={"text-3xl text-center font-semibold mt-10 relative "+BRILLANT_REGULAR.className}>
        How we work
        <div className="absolute -bottom-2 h-1 w-24 bg-primary left-1/2 -translate-x-1/2"></div>
      </h1>
      <p className="text-center mt-5">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, in!
      </p>
      <div className="flex justify-between w-2/3 mx-auto mt-14">
        <div className="w-1/2 flex flex-col gap-10 justify-center">
          <div className="border-l-4 border-primary pl-8">
            <h1 className="text-xl font-semibold">Choose a plant</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Molestias quibusdam ipsa veniam iusto accusamus praesentium, a
              repudiandae in dolorem suscipit?
            </p>
          </div>
          <div className="border-l-4 border-primary pl-8">
            <h1 className="text-xl font-semibold">Place an Order</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Molestias quibusdam ipsa veniam iusto accusamus praesentium, a
              repudiandae in dolorem suscipit?
            </p>
          </div>
          <div className="border-l-4 border-primary pl-8">
            <h1 className="text-xl font-semibold">Get Delivered</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Molestias quibusdam ipsa veniam iusto accusamus praesentium, a
              repudiandae in dolorem suscipit?
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <Image src={p8} alt="plant8" className="h-[500px] object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Work;
