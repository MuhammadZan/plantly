import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Model from "@/components/globals/model";
import { IOrder } from "@/model/Order";
import { request } from "@/services/apiService";
import { IProduct } from "@/model/Product";
import { useUtility } from "@/context/loaderContext";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/globals/button";
import { AxiosResponse } from "axios";
import { BRILLANT_REGULAR } from "@/app/fonts";
const Index = () => {
  const { setLoading } = useUtility();
  const [order, setOrder] = useState<IOrder[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [updateModel, setUpdateModel] = useState<boolean>(false);
  const [orderToUpdate, setOrderToUpdate] = useState<Partial<IOrder> | null>(
    null
  );
  const [items, setItems] = useState<
    {
      unitPrice: number;
      quantity: number;
      product: IProduct;
    }[]
  >([]);
  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await request("order/get");
      setOrder(res.data as IOrder[]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const updateStatus = async (id: string) => {
    try {
      setLoading(true);
      const res: AxiosResponse = await request(
        `order/${id}`,
        "put",
        orderToUpdate
      );
      if (res.status === 200) {
        setOrder((pre) => {
          let o = pre.find((o) => String(o._id) === id);
          if (o && orderToUpdate) {
            o.status = orderToUpdate.status as string;
          }
          return pre;
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOrderToUpdate(null);
      setUpdateModel(false);
      setLoading(false);
    }
  };
  const removeOrder = async (id: string) => {
    try {
      const res = await request(`order/${id}`, "delete");
      if (res.status === 200) {
        setOrder((pre) => pre.filter((o) => String(o._id) != id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <Model
        componenet={
          <div className="p-5">
            <h1
              className={
                "text-xl font-bold text-primary mb-5 " +
                BRILLANT_REGULAR.className
              }
            >
              Items
            </h1>
            {items.map(
              (item, index) =>
                item.product && (
                  <div
                    key={index}
                    className="flex p-5 rounded bg-slate-50 gap-5 relative mt-5"
                  >
                    <span className="bg-primary text-white font-bold rounded-full p-3 text-sm absolute w-[15px] h-[15px] flex justify-center items-center -top-2 -left-2">
                      {item.quantity}
                    </span>
                    <img
                      src={item.product.image || ""}
                      className="w-[100px] h-[100px] object-contain"
                      alt="pizza card"
                    />
                    <div>
                      <h1 className="text-xl font-semibold">
                        {item.product.name || ""}
                      </h1>
                      <p className="text-[12px]">
                        {item.product.description.slice(0, 70) || ""}...
                      </p>
                    </div>
                  </div>
                )
            )}
          </div>
        }
        visible={visible}
        setVisible={setVisible}
      />
      <Model
        componenet={
          <div className="px-5 my-6">
            <h1 className="text-primary font-bold text-xl text-center">
              Update Order Status
            </h1>
            <div className="flex flex-col gap-4 mt-5">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-semibold">
                  Order Status *
                </label>
                <select
                  value={orderToUpdate?.status}
                  name="status"
                  onChange={(e) => {
                    setOrderToUpdate((pre) => ({
                      ...pre,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                  className="border p-2 rounded-md focus:outline-primary"
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="delivering">Delivering</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <Button
                text="Update Status"
                onClick={() => {
                  updateStatus(orderToUpdate?._id as string);
                }}
              />
            </div>
          </div>
        }
        visible={updateModel}
        setVisible={setUpdateModel}
      />
      <div className="px-5 w-full mb-10`">
        <h1 className={"text-2xl font-bold " + BRILLANT_REGULAR.className}>
          Order History
        </h1>
        <div className="flex gap-5 mt-10 border-b-2 pb-3">
          <div className="text-primary font-semibold relative cursor-pointer">
            All Orders
          </div>
          <div className="cursor-pointer">Completed</div>
          <div className="cursor-pointer">Cancelled</div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex rounded-lg bg-red-100 w-full justify-between px-5 py-3">
            <span className="w-[10%] text-center">Order ID</span>
            <span className="w-[18.56%] text-center">Customer Name</span>
            <span className="w-[14.28%] text-center">Payment Status</span>
            <span className="w-[14.28%] text-center">Payment Method</span>
            <span className="w-[14.28%] text-center">Order Status</span>
            <span className="w-[14.28%] text-center">Total</span>
            <span className="w-[14.28%] text-center">Actions</span>
          </div>
          <AnimatePresence>
            {order.map((o, index) => (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "keyframes",
                  duration: 0.3,
                  delay: index / 10,
                }}
                exit={{ opacity: 0, x: -10 }}
                key={index}
                className="flex rounded-lg shadow-lg w-full justify-between px-5 py-3 items-center"
              >
                <span className="w-[10%] text-center border-r capitalize">
                  # {index + 1}
                </span>
                <span className="w-[18.56%] text-center border-r capitalize">
                  {(o.userId as any).fullName}
                </span>
                <span className="w-[14.28%] text-center border-r text-orange-500 capitalize">
                  Pending
                </span>
                <span className="w-[14.28%] text-center border-r">{"COD"}</span>
                <span className="w-[14.28%] text-center border-r capitalize">
                  {o.status}
                </span>
                <span className="w-[14.28%] text-center border-r">
                  RS. {o.totalBill}/-
                </span>
                <span className="w-[14.28%] flex justify-center gap-2">
                  <span
                    className="p-2 rounded-lg border bg-gray-50 shadow-lg cursor-pointer"
                    onClick={() => {
                      removeOrder(o._id as string);
                    }}
                  >
                    <Icon
                      icon="weui:delete-on-filled"
                      className="w-5 h-5 text-primary"
                    />
                  </span>
                  <span
                    className="p-2 rounded-lg border bg-gray-50 shadow-lg cursor-pointer"
                    onClick={() => {
                      setItems(o.items as any);
                      setVisible(true);
                    }}
                  >
                    <Icon
                      icon="tabler:list-details"
                      className="w-5 h-5 text-primary"
                    />
                  </span>
                  <span
                    className="p-2 rounded-lg border bg-gray-50 shadow-lg cursor-pointer"
                    onClick={() => {
                      setOrderToUpdate(o);
                      setUpdateModel(true);
                    }}
                  >
                    <Icon
                      icon="flowbite:edit-outline"
                      className="w-5 h-5 text-primary"
                    />
                  </span>
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Index;
