import React, { useEffect, useState } from "react";
import { BRILLANT_REGULAR } from "@/app/fonts";
import { IProduct } from "@/model/Product";
import { request } from "@/services/apiService";
import ProductCardComponent from "../ProductComponentCard";
const Results = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const getAllProducts = async () => {
    try {
      const res = await request("porduct/get");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      <h1
        className={
          "text-3xl text-center font-semibold mt-10 relative " +
          BRILLANT_REGULAR.className
        }
      >
        Search Results
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

export default Results;
