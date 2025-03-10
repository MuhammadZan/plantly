import React, { useEffect, useState } from "react";
import { ICart, useCart } from "@/context/cartContext";
interface componentProps {
  item: ICart;
}

const CartItem: React.FC<componentProps> = ({ item }) => {
  const { increaseItem, decreaseItem } = useCart();

  return (
    <div className="flex p-3 bg-gray-100 w-full justify-between rounded-lg items-end">
      <div className="gap-5 items-end flex w-[70%] ">
        <div className="rounded-lg overflow-hidden h-[120px] flex items-center">
          <img src={item.image} alt="" className=" object-contain" />
        </div>
        <div>
          <h1 className="text-lg font-bold">{item.title}</h1>
          <p className="text-[10px]">{item.description}</p>
        </div>
      </div>
      <div className="flex gap-5 items-end justify-end flex-col">
        <div className="flex gap-3 items-center">
          <span
            className="border shadow-xl w-[30px] h-[30px] flex justify-center items-center rounded-md font-bold cursor-pointer"
            onClick={() => {
              decreaseItem(String(item.product));
            }}
          >
            -
          </span>
          <span className="font-semibold text-primary">{item.quantity}</span>
          <span
            className="border shadow-xl w-[30px] h-[30px] flex justify-center items-center rounded-md font-bold cursor-pointer"
            onClick={() => {
              increaseItem(String(item.product));
            }}
          >
            +
          </span>
        </div>
        <span className="text-primary font-semibold">
          $ {(item.unitCost * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
