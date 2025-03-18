import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { request } from "@/services/apiService";
import { useUtility } from "@/context/loaderContext";
import { BRILLANT_REGULAR } from "@/app/fonts";
import Image from "next/image";
const DrawChart = dynamic(import("@/components/chart"), { ssr: false });
const Dashboard = () => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const { setLoading } = useUtility();
  const getData = async () => {
    try {
      setLoading(true);
      const res = await request("stats");
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full px-5">
      <div className="rounded-xl p-5 w-full bg-primary text-white">
        <h1 className={"font-bold text-xl " + BRILLANT_REGULAR.className}>
          Dashboard
        </h1>
        <p>Access all modules from here </p>
        <div className="flex gap-5 justify-start mt-5">
          <div className="rounded-lg shadow-xl w-[200px] h-[100px] bg-white text-black p-2 flex flex-col justify-center">
            <h3 className="mt-2 font-semibold text-2xl">
              RS. {data?.totalSales || 0}/-
            </h3>
            <p className="text-sm text-primary">Total Sales</p>
          </div>
          <Link href={"/admin/customer"}>
            <div className="rounded-lg shadow-xl w-[200px] h-[100px] bg-white text-black p-2 flex flex-col justify-center">
              <div className="flex gap-2 items-center">
                <Icon
                  icon={"heroicons:users-solid"}
                  className="w-10 h-10 text-primary"
                />
                <span className="font-semibold text-xl">Users</span>
              </div>
              <div>
                <p className="text-lg mt-1">
                  {data?.userCount || 0} Total Users
                </p>
              </div>
            </div>
          </Link>
          <Link href={"/admin/product"}>
            <div className="rounded-lg shadow-xl w-[200px] h-[100px] bg-white text-black p-2 flex flex-col justify-center">
              <div className="flex gap-2 items-center">
                <Icon
                  icon={"ant-design:product-filled"}
                  className="w-10 h-10 text-primary"
                />
                <span className="font-semibold text-xl">Products</span>
              </div>
              <div>
                <p className="text-lg mt-1">{data?.menuCount || 0} Items</p>
              </div>
            </div>
          </Link>
          <Link href={"/admin/order"}>
            <div className="rounded-lg shadow-xl w-[200px] h-[100px] bg-white text-black p-2 flex flex-col justify-center">
              <div className="flex gap-2 items-center">
                <Icon
                  icon={"mdi:order-bool-descending-variant"}
                  className="w-10 h-10 text-primary"
                />
                <span className="font-semibold text-xl">Orders</span>
              </div>
              <div>
                <p className="text-lg mt-1">{data?.orderCount || 0} Orders</p>
              </div>
            </div>
          </Link>
          <Link href={"/admin/global"}>
            <div className="rounded-lg shadow-xl w-[200px] h-[100px] bg-white text-black p-2 flex flex-col justify-center">
              <div className="flex gap-2 items-center">
                <Icon
                  icon={"stash:globe-light"}
                  className="w-10 h-10 text-primary"
                />
                <span className="font-semibold text-xl">Globals</span>
              </div>
              <div>
                <p className="text-lg mt-1">Access Global settings</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <h1 className={"text-xl font-bold mt-5 " + BRILLANT_REGULAR.className}>
        Sales
      </h1>

      <div className="flex">
        <DrawChart
          labels={[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]}
          data={data?.sales}
          tooltipText="Sales"
          title="Monthly Sales"
        />
        <div className="w-full px-5 border m-5 rounded-xl h-[300px] overflow-y-scroll">
          <h1 className="text-xl font-semibold">Quick Orders</h1>
          <div className="mt-5">
            {data?.quickOrders ? (
              data?.quickOrders.map((order: any, index: number) => (
                <div
                  key={index}
                  className="rounded-lg shadow-lg p-2 flex justify-between mt-5"
                >
                  <h1 className="text-primary">
                    {order.userId?.fullName || "N/A"}
                  </h1>
                  <div className="flex items-center gap-5">
                    <p>$ {order?.totalBill}</p>
                    <p>{order?.orderMedium}</p>
                    <Icon
                      icon="solar:arrow-right-broken"
                      className="text-primary w-5 h-5"
                    />
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <h1 className={"text-xl font-bold mt-5 " + BRILLANT_REGULAR.className}>
        Hot Items
      </h1>
      <div className="flex gap-5 mt-5">
        {data &&
          data.topSales.map((item: any, index: number) => (
            <div key={index}>
              <div className="bg-product h-[180px] w-[180px] flex justify-center flex-col items-center">
                <Image
                  src={item.productImage}
                  alt=""
                  className="w-[180px] h-[180px] object-contain"
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex justify-between mt-2">
                <h1 className="font-semibold">{item.productName.slice(0,15)}...</h1>
                <h1 className={"font-bold text-sm text-primary "+BRILLANT_REGULAR.className}>{item.totalQuantitySold}</h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
