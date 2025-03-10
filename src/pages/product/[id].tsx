import Image from "next/image";
import React from "react";
import p1 from "@/app/images/plant1.png";
import { BRILLANT_REGULAR } from "@/app/fonts";
import { Icon } from "@/components/Icons";
import Button from "@/components/globals/button";
import ProductSection from "@/components/home/productSection";
const SingleProductPage = () => {
  return (
    <div className="min-h-screen p-10">
      <div className="flex">
        <div className="w-1/2">
          <div>{"home > product > ornamental plant"}</div>
          <div className="w-full h-[500px] bg-white rounded-xl mt-5 flex justify-center items-center">
            <Image src={p1} alt=";" className="h-full object-contain" />
          </div>
        </div>
        <div className="w-1/2 p-10">
          <h1
            className={
              "text-3xl mt-10 font-semibold " + BRILLANT_REGULAR.className
            }
          >
            Ornamental Plant
          </h1>
          <div className="flex items-center">
            <Icon icon="solar:star-bold-duotone" className="text-primary" />
            <Icon icon="solar:star-bold-duotone" className="text-primary" />
            <Icon icon="solar:star-bold-duotone" className="text-primary" />
            <Icon icon="solar:star-bold-duotone" className="text-primary" />
            <Icon icon="solar:star-bold-duotone" className="text-primary" />
            <div className="text-gray-400 ml-10 font-semibold">3K+ Sales</div>
          </div>
          <p className="mt-10 text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
            voluptas autem sit, in laudantium hic optio dolorum mollitia nostrum
            ullam laborum dolore libero deleniti quas enim, repellat id? Atque
            culpa odio pariatur. Sit voluptatum ut ratione debitis incidunt
            consequuntur obcaecati.
          </p>
          <div className="flex gap-5 mt-10">
            <Button
              className="hover:bg-primary hover:text-white font-semibold border rounded"
              text="S"
            />
            <Button
              className="hover:bg-primary hover:text-white font-semibold border rounded"
              text="M"
            />
            <Button
              className="hover:bg-primary hover:text-white font-semibold border rounded"
              text="L"
            />
            <Button
              className="hover:bg-primary hover:text-white font-semibold border rounded"
              text="XL"
            />
            <Button
              className="hover:bg-primary hover:text-white font-semibold border rounded"
              text="XXL"
            />
          </div>
          <Button text="Add To Cart" className="bg-primary mt-10 text-white" />
        </div>
      </div>
      <ProductSection />
      <h1 className={"text-3xl font-bold "+BRILLANT_REGULAR.className}>Related Articles
      </h1>
    </div>
  );
};

export default SingleProductPage;
