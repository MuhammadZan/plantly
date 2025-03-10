import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SideBar from "@/components/sideBar";
const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <div className="flex">
      <SideBar />
    </div>
  );
};

export default Dashboard;
