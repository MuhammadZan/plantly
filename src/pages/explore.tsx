import React from "react";
import { ProductProps } from "@/components/productCard";
import { ProductCardComponent } from "@/components/search/results";
import p1 from "@/app/images/plant1.png";
import p2 from "@/app/images/plant2.png";
import p3 from "@/app/images/plant3.png";
import p4 from "@/app/images/plant4.png";
import p5 from "@/app/images/plant5.png";
import p6 from "@/app/images/plant6.png";
import { BRILLANT_REGULAR } from "@/app/fonts";
const products: ProductProps[] = [
  {
    image: p1,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 500,
  },
  {
    image: p2,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 499,
  },
  {
    image: p3,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 449,
  },
  {
    image: p4,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 599,
  },
  {
    image: p5,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 530,
  },
  {
    image: p6,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 699,
  },
  {
    image: p3,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 449,
  },
  {
    image: p4,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 599,
  },
];
const Explore = () => {
  return (
    <div>
      <h1
        className={
          "text-3xl text-center font-semibold mt-10 relative " +
          BRILLANT_REGULAR.className
        }
      >
        Explore
        <div className="absolute -bottom-2 h-1 w-24 bg-primary left-1/2 -translate-x-1/2"></div>
      </h1>
      <p className="text-center mt-5">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, in!
      </p>
      <div className="flex flex-wrap gap-10 mx-auto mt-10 justify-center relative z-10">
        {products.map((product, index) => (
          <ProductCardComponent key={index} {...product} />
        ))}
      </div>
    </div>
  );
};
export default Explore;
