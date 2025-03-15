import Image from "next/image";
import React from "react";
import p1 from "@/app/images/plant1.png";
import { BRILLANT_REGULAR } from "@/app/fonts";
import { Icon } from "@/components/Icons";
import Button from "@/components/globals/button";
import ProductSection from "@/components/home/productSection";
import { GetServerSideProps } from "next";
import { IProduct, Product } from "@/model/Product";
import { connectToDb } from "@/utils/db";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as any;
  let product: IProduct | null = null;
  try {
    await connectToDb();
    product = await Product.findById(id);
  } catch (error) {
    console.log(error);
  }
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
};

const SingleProductPage = ({ product }: { product: IProduct }) => {
  const { addToCart } = useCart();
  return (
    <div className="min-h-screen p-10">
      <div className="flex">
        <div className="w-1/2">
          <div>
            <Link href={"/"}>home</Link>
            {" > "}
            <Link href={"/explore"}>product</Link>
            {" > "}
            <Link href={""}>{product.name}</Link>
          </div>
          <div className="w-full h-[500px] bg-white rounded-xl mt-5 flex justify-center items-center">
            <Image
              src={product.image}
              height={500}
              loading="lazy"
              alt=""
              className="h-full object-contain"
            />
          </div>
        </div>
        <div className="w-1/2 p-10">
          <h1
            className={
              "text-3xl mt-10 font-semibold " + BRILLANT_REGULAR.className
            }
          >
            {product.name}
          </h1>
          <div className="flex items-center">
            <Icon icon="solar:star-bold-duotone" className="text-primary" />
            <Icon icon="solar:star-bold-duotone" className="text-primary" />
            <Icon icon="solar:star-bold-duotone" className="text-primary" />
            <Icon icon="solar:star-bold-duotone" className="text-primary" />
            <Icon icon="solar:star-bold-duotone" className="text-primary" />
            <div className="text-gray-400 ml-10 font-semibold">3K+ Sales</div>
          </div>
          <p className="mt-10 text-gray-400">{product.description}</p>
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
          <Button
            text="Add To Cart"
            onClick={() => {
              addToCart(product);
            }}
            className="bg-primary mt-10 text-white"
          />
        </div>
      </div>
      <ProductSection />
      <h1 className={"text-3xl font-bold " + BRILLANT_REGULAR.className}>
        Related Articles
      </h1>
    </div>
  );
};

export default SingleProductPage;
