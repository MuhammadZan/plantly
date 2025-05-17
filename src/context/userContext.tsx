import { IUser } from "@/model/User";
import { request } from "@/services/apiService";
// import { AxiosResponse } from "axios";
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
import plant from "@/app/images/login-img.jpeg";
import { BRILLANT_REGULAR } from "@/app/fonts";
import Button from "@/components/globals/button";
// import Link from "next/link";
import { Icon, Logout } from "@/components/Icons";
interface IUserProvider {
  children: ReactNode;
}
interface IUserContext {
  login: () => void;
  register: (data: Partial<IUser>) => void;
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
  const [user, setUser] = useState<Partial<IUser>>({
    fullName: "a",
  });
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
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

  const login = async () => {
    try {
      if (!credentials.email || !credentials.password) {
        toast("Please fill credentials", "error");
        return;
      }
      setLoading(true);
      const response = await request("auth/login", "POST", credentials);
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

  const register = async (data: Partial<IUser>) => {
    try {
      setLoading(true);
      const response = await request("auth/register", "POST", data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setUser(response.data.user);
      router.push("/");
    } catch (error) {
      console.error("Failed to register", error);
      toast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.clear();
    setUser({});
    setIsLoggedIn(false);
    setShowLoginForm(false)
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
            {!isLoggedIn ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "keyframes", duration: 0.4 }}
                className="w-[60%] h-[500px] rounded-3xl bg-white fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 flex  justify-between p-5"
              >
                <div className="w-1/2 rounded-2xl overflow-hidden">
                  <Image
                    src={plant}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-1/2 p-10 flex flex-col items-center">
                  <h1
                    className={
                      "text-2xl text-black text-center font-semibold relative " +
                      BRILLANT_REGULAR.className
                    }
                  >
                    Login
                    <div className="absolute -bottom-4 h-1 w-24 bg-primary left-1/2 -translate-x-1/2"></div>
                  </h1>
                  <div className="flex flex-col mt-14 w-[90%]">
                    <label htmlFor="" className="text-lg font-semibold">
                      User Name/Email
                    </label>
                    <input
                      type="email"
                      placeholder="Email/Username"
                      className="outline-none py-3 px-2 border "
                      value={credentials.email}
                      onChange={(e) =>
                        setCredentials((pre) => ({
                          ...pre,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col mt-5 w-[90%]">
                    <label htmlFor="" className="text-lg font-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="outline-none py-3 px-2 border "
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials((pre) => ({
                          ...pre,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Button
                    text="Login"
                    onClick={login}
                    className="w-[90%] bg-primary text-white mt-8"
                  />
                  <div className="w-full flex gap-2 mt-3 justify-center">
                    Not a <span className={"font-semibold"}>Plantly</span>{" "}
                    member ?{" "}
                    <span
                      onClick={() => {
                        setShowLoginForm(false);
                        router.push("/signup");
                      }}
                      className="font-semibold text-primary underline flex items-center gap-2 cursor-pointer"
                    >
                      Be One{" "}
                      <Icon
                        icon="line-md:emoji-smile-wink-filled"
                        className="mt-1"
                      />
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "keyframes", duration: 0.4 }}
                className="w-[300px] h-fit rounded-3xl bg-white fixed right-10 top-20 z-50 flex justify-between p-5"
              >
                <div className="flex justify-between w-full items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-[40px] h-[40px] rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold uppercase">
                      {user.fullName && user.fullName[0]}
                    </div>
                    {user.fullName}
                  </div>
                  <Logout onClick={logout} />
                </div>
              </motion.div>
            )}
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
