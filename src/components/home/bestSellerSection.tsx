import React from "react";
import p1 from "@/app/images/plant1.png";
import p2 from "@/app/images/plant2.png";
import p3 from "@/app/images/plant3.png";
import p4 from "@/app/images/plant4.png";
import p5 from "@/app/images/plant5.png";
import p6 from "@/app/images/plant6.png";
import stem from "@/app/images/stem.png";
import { ProductProps } from "../productCard";
import Image from "next/image";
import { Cart, Favourit } from "../Icons";
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
];
const BestSellerSection = () => {
  return (
    <div>
      <h1
        className={
          "text-3xl text-center font-semibold mt-10 relative " +
          BRILLANT_REGULAR.className
        }
      >
        Our Best Seller
        <div className="absolute -bottom-2 h-1 w-24 bg-primary left-1/2 -translate-x-1/2"></div>
      </h1>
      <p className="text-center mt-5">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, in!
      </p>
      <div className="flex flex-wrap gap-10 w-2/3 mx-auto mt-10 justify-center relative z-10">
        {products.map((product, index) => (
          <ProductCardComponent key={index} {...product} />
        ))}
      </div>
    </div>
  );
};
const ProductCardComponent = ({
  image,
  title,
  price,
  description,
}: ProductProps) => (
  <div className="backdrop-blur-sm">
    <div className="bg-product flex justify-center items-center h-[300px] w-[300px] relative">
      <span className="absolute top-5 right-5">
        <Favourit />
      </span>
      <Image
        src={image}
        alt={description}
        className="w-[80%] h-[80%] object-contain"
      />
    </div>
    <div className="flex justify-between">
      <h1 className="text-md">{title}</h1>
      <Cart />
    </div>
    <p className="text-primary">Rs. {price}/-</p>
  </div>
);
export default BestSellerSection;
