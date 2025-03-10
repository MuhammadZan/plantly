import { IUser } from "@/model/User";
import { request } from "@/services/apiService";
import { AxiosResponse } from "axios";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useUtility } from "./loaderContext";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import bail from "@/app/images/bail.png";
import { BRILLANT_REGULAR } from "@/app/fonts";
import Button from "@/components/globals/button";
interface IUserProvider {
  children: ReactNode;
}
interface IUserContext {
  login: (data: any) => void;
  register: (data: any) => void;
  logout: () => void;
  isLoggedIn: boolean;
  showLoginFrom: boolean;
  setShowLoginForm: any;
  user: Partial<IUser> | null;
}

const UserContext = createContext<IUserContext | undefined>(undefined);
export const UserProvider: React.FC<IUserProvider> = ({ children }) => {
  const router = useRouter();
  const { setLoading, toast } = useUtility();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLoginFrom, setShowLoginForm] = useState<boolean>(false);
  const [user, setUser] = useState<Partial<IUser> | null>(null);
  const getInfo = async () => {
    try {
      setLoading(true);
      const res = await request("auth/info");
      setIsLoggedIn(true);
      setUser(res.data as IUser);
    } catch (error) {
      console.log(error);
      toast("Unable to fetch user info", "error");
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     getInfo();
  //   } else {
  //     router.push("/");
  //   }
  // }, []);

  const login = async (data: any) => {
    try {
      setLoading(true);
      const response: AxiosResponse = await request("auth/login", "POST", data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setShowLoginForm(false);
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to login", error);
      toast("Invalid Credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    try {
      setLoading(true);
      const response: AxiosResponse = await request(
        "auth/register",
        "POST",
        data
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setShowLoginForm(false);
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to register", error);
      toast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
    router.push("/");
  };
  useEffect(() => {
    const body = document.querySelector("body");

    showLoginFrom
      ? body && (body.style.overflow = "hidden")
      : body && (body.style.overflow = "auto");
  }, [showLoginFrom]);
  return (
    <UserContext.Provider
      value={{
        login,
        register,
        logout,
        isLoggedIn,
        showLoginFrom,
        setShowLoginForm,
        user,
      }}
    >
      <AnimatePresence>
        {showLoginFrom && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "keyframes", duration: 0.4 }}
              onClick={() => setShowLoginForm(false)}
              className="w-screen h-screen bg-black/30 fixed top-0 z-40"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "keyframes", duration: 0.4 }}
              className="w-[600px] h-[500px] rounded-3xl bg-white fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center p-20 px-32"
            >
              <div className="absolute -top-2 -left-10 h-full w-fit">
                <Image
                  className="h-full w-fit object-contain"
                  src={bail}
                  alt=""
                />
              </div>
              <h1
                className={
                  "text-2xl text-black text-center font-semibold relative " +
                  BRILLANT_REGULAR.className
                }
              >
                Login
                <div className="absolute -bottom-4 h-1 w-24 bg-primary left-1/2 -translate-x-1/2"></div>
              </h1>
              <div className="flex flex-col mt-14">
                <label htmlFor="" className="text-lg font-semibold">
                  User Name/Email
                </label>
                <input
                  type="email"
                  placeholder="Email/Username"
                  className="outline-none py-3 px-2 border"
                />
              </div>
              <div className="flex flex-col mt-5">
                <label htmlFor="" className="text-lg font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="outline-none py-3 px-2 border"
                />
              </div>
              <Button text="Login" onClick={() => {}} className="w-full bg-primary text-white mt-10"/>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUserContext => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
