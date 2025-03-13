import React, { useEffect, useState } from "react";
import Button from "./globals/button";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "./globals/logo";
const MenuItem = ({
  icon,
  text,
  link,
  isActive,
}: {
  icon: string;
  text: string;
  link: string;
  isActive?: boolean;
}) => {
  const router = useRouter();

  return (
    <Link href={`/admin/${link}`}>
      <li
        className={`p-2 border rounded-md my-2 group relative hover:bg-primary hover:text-white transition-all duration-300 flex gap-2 items-center ${
          router.pathname.includes(link) && "bg-primary text-white"
        }`}
      >
        <Icon
          icon={icon}
          className={`w-5 h-5 group-hover:text-white text-primary transition-all duration-300 ${
            router.pathname.includes(link) && "text-white"
          }`}
        />
        {text}
      </li>
    </Link>
  );
};
const menuItems = [
  {
    text: "Dashboard",
    isActive: false,
    icon: "basil:home-solid",
    link: "dashboard",
  },
  {
    text: "Orders",
    isActive: true,
    icon: "mdi:order-bool-descending-variant",
    link: "order",
  },
  {
    text: "Products",
    isActive: false,
    icon: "ant-design:product-filled",
    link: "product",
  },
  {
    text: "Customers",
    isActive: false,
    icon: "heroicons:users-solid",
    link: "customer",
  },
  {
    text: "Globals",
    isActive: false,
    icon: "stash:globe-light",
    link: "global",
  },
];
const SideBar = () => {
  const { logout } = useUser();

  return (
    <div className="w-[300px] relative">
      <div className="w-[250px]  h-screen p-5 pr-0 flex flex-col justify-between fixed">
        <div>
          <Logo />
          <ul className="mt-10">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                text={item.text}
                link={item.link}
                icon={item.icon}
                isActive={item.isActive}
              />
            ))}
          </ul>
        </div>
        <Button text="Logout" onClick={logout} className="bg-primary w-full text-white" />
      </div>
    </div>
  );
};

export default SideBar;
