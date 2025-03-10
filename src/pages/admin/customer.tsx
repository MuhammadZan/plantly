import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { IUser } from "@/model/User";
import { request } from "@/services/apiService";
import { useUtility } from "@/context/loaderContext";
import { AnimatePresence, motion } from "framer-motion";
const Index = () => {
  const [customers, setCustomers] = useState<IUser[]>([]);
  const { setLoading } = useUtility();
  const getCustomers = async () => {
    try {
      setLoading(true);
      const res = await request("auth/users");
      setCustomers(res.data as IUser[]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteCustomer = async (id: string) => {
    try {
      await request(`auth/${id}`, "delete");
      setCustomers((pre) => pre.filter((c) => String(c._id) != id));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCustomers();
  }, []);
  return (
    <>
      <div className="px-5 w-full mb-10`">
        <div className="flex justify-between items-between">
          <h1 className="text-2xl font-bold">Customers</h1>
          <div></div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex rounded-lg bg-red-100 w-full justify-between px-5 py-3">
            <span className="w-[5%] text-center">Sr</span>
            <span className="w-[18.56%] text-center">Customer Name</span>
            <span className="w-[18.56%] text-center">Customer Contact</span>
            <span className="w-[45.28%] text-center">Customer Address</span>
            <span className="w-[14.28%] text-center">Actions</span>
          </div>
          <AnimatePresence>
            {customers.map((customer, index) => (
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
                <span className="w-[5%] text-center border-r capitalize">
                  # {index + 1}
                </span>
                <span className="w-[18.56%] text-center border-r text-orange-500 capitalize">
                  {customer.fullName}
                </span>
                <span className="w-[18.56%] text-center border-r text-orange-500 capitalize">
                  {customer.contact}
                </span>
                <span className="w-[45.28%] text-center border-r capitalize">
                  {customer.address}
                </span>
                <span className="w-[14.28%] flex justify-center gap-2">
                  <span
                    className="p-2 rounded-lg border bg-gray-50 shadow-lg cursor-pointer"
                    onClick={() => deleteCustomer(String(customer._id))}
                  >
                    <Icon
                      icon="weui:delete-on-filled"
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
