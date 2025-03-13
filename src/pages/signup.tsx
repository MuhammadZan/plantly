import { BRILLANT_REGULAR } from "@/app/fonts";
import Button from "@/components/globals/button";
import SwipableTextButton from "@/components/globals/SwipableTextButton";
import { Icon } from "@/components/Icons";
import { useUtility } from "@/context/loaderContext";
import { useUser } from "@/context/userContext";
import { IUser } from "@/model/User";
import React, { useState } from "react";

const Signup = () => {
  const { setShowLoginForm, register } = useUser();
  const [userData, setUserData] = useState<Partial<IUser>>({
    fullName: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    postalCode: "",
  });
  const [repass, setrepass] = useState<string>("");
  const { toast } = useUtility();
  return (
    <div className="min-h-[90vh] flex p-10 relative">
      <div className="w-1/2 flex justify-between flex-col sticky top-0 px-20">
        <div>
          <h1
            className={
              "text-6xl font-bold leading-relaxed " + BRILLANT_REGULAR.className
            }
          >
            Welcome to Plantly
          </h1>
          <p className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
            quisquam. Amet officiis fugit nam corrupti ducimus delectus mollitia
            optio voluptatibus! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Eos, incidunt.
          </p>
          <div className="flex gap-2 mt-10">
            <Icon icon="mage:email" />
            <SwipableTextButton text="support@plantly.com" />
          </div>
          <div className="flex gap-2 mt-2">
            <Icon icon="ri:phone-line" />
            <SwipableTextButton text="+1 (123) 456-7890" />
          </div>
        </div>
        <div>
          Already a member?{" "}
          <span
            onClick={() => setShowLoginForm(true)}
            className="text-primary font-semibold underline cursor-pointer"
          >
            Login
          </span>
        </div>
      </div>
      <div className="w-1/2 px-10">
        <div className="bg-white p-10 rounded-3xl">
          <div className="flex flex-col w-full">
            <label htmlFor="" className="text-lg font-semibold">
              User Name
            </label>
            <input
              type="text"
              placeholder="Username"
              value={userData.fullName}
              onChange={(e) =>
                setUserData((pre) => ({ ...pre, fullName: e.target.value }))
              }
              className="outline-none py-3 px-2 border mt-1"
            />
          </div>
          <div className="flex flex-col mt-4 w-full">
            <label htmlFor="" className="text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData((pre) => ({ ...pre, email: e.target.value }))
              }
              className="outline-none py-3 px-2 border mt-1"
            />
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col mt-4 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Address
              </label>
              <input
                type="text"
                placeholder="Address"
                value={userData.address}
                onChange={(e) =>
                  setUserData((pre) => ({ ...pre, address: e.target.value }))
                }
                className="outline-none py-3 px-2 border mt-1"
              />
            </div>
            <div className="flex flex-col mt-4 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Postal Code
              </label>
              <input
                type="number"
                placeholder="number"
                value={userData.postalCode}
                onChange={(e) =>
                  setUserData((pre) => ({
                    ...pre,
                    postalCode: String(e.target.value),
                  }))
                }
                className="outline-none py-3 px-2 border mt-1"
              />
            </div>
          </div>
          <div className="flex flex-col mt-4 w-full">
            <label htmlFor="" className="text-lg font-semibold">
              Contact
            </label>
            <input
              type="number"
              placeholder="number"
              value={userData.contact}
              onChange={(e) =>
                setUserData((pre) => ({
                  ...pre,
                  contact: String(e.target.value),
                }))
              }
              className="outline-none py-3 px-2 border mt-1"
            />
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col mt-4 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) =>
                  setUserData((pre) => ({ ...pre, password: e.target.value }))
                }
                className="outline-none py-3 px-2 border mt-1"
              />
            </div>
            <div className="flex flex-col mt-4 w-full">
              <label htmlFor="" className="text-lg font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter Password"
                value={repass}
                onChange={(e) => setrepass(e.target.value)}
                className="outline-none py-3 px-2 border mt-1"
              />
            </div>
          </div>
          <Button
            text="Signup "
            className="bg-primary text-white mt-4"
            onClick={() => {
              if (userData.password != repass) {
                toast("Passwords mis-match", "error");
                return;
              }
              if (!userData.fullName || !userData.email || !userData.password || !userData.contact || !userData.address || !userData.postalCode) {
                toast("Please fill all the fields", "error");
                return;
              }
              register(userData);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
