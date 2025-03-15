import { IItems } from "@/model/Order";
import { request } from "@/services/apiService";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useUser } from "./userContext";
import { IProduct } from "@/model/Product";
import { useUtility } from "./loaderContext";
import { AnimatePresence, motion } from "framer-motion";
import { BRILLANT_REGULAR } from "@/app/fonts";
import Button from "@/components/globals/button";
import { Icon } from "@/components/Icons";
import Image from "next/image";
interface ICartProvider {
  children: ReactNode;
}
export interface ICart extends IItems {
  title: string;
  description?: string;
  image: string;
}
interface ICartContext {
  addToCart: (item: Partial<IProduct>) => void;
  increaseItem: (product: string) => void;
  decreaseItem: (product: string) => void;
  removeCartItem: (product: string) => void;
  confirmOrder: () => void;
  cart: ICart[];
  medium: string;
  setMedium: any;
  showCart: boolean;
  setShowCart: any;
}
const CartContext = createContext<ICartContext | undefined>(undefined);
export const CartProvider: React.FC<ICartProvider> = ({ children }) => {
  const { setLoading, toast } = useUtility();
  const { isLoggedIn, setShowLoginForm } = useUser();
  const [showCart, setShowCart] = useState<boolean>(false);
  const [medium, setMedium] = useState<string>("delivery");
  const [cart, setCart] = useState<ICart[]>([]);
  useEffect(() => {}, []);
  const addToCart = (item: Partial<IProduct>) => {
    if (!item) {
      return;
    }
    if (!isLoggedIn) {
      alert("please login first to place an order");
      setShowLoginForm(true);
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (i: ICart) => String(i.product) === item._id
      );
      if (existingProduct) {
        return prevCart.map((i) =>
          String(i.product) === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        return [
          ...prevCart,
          {
            title: item.name as string,
            image: item.image as string,
            product: item._id as any,
            quantity: 1,
            unitCost: item.price as number,
          },
        ];
      }
    });
    toast(`${item.name} added to cart`, "success");
  };

  const increaseItem = (product: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        String(item.product) === product
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseItem = (product: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          String(item.product) === product
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (product: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => String(item.product) !== product)
    );
    toast(`Item removed from cart`);
  };

  const confirmOrder = async () => {
    try {
      setLoading(true);
      await request("order/create", "post", { products: cart, medium });
      toast(`Your Order has been confirmed`);
      setCart((pre) => []);
    } catch (error) {
      console.error("Failed to confirm order", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const body = document.querySelector("body");

    showCart
      ? body && (body.style.overflow = "hidden")
      : body && (body.style.overflow = "auto");
  }, [showCart]);
  return (
    <CartContext.Provider
      value={{
        addToCart,
        increaseItem,
        decreaseItem,
        removeCartItem,
        confirmOrder,
        cart,
        showCart,
        setShowCart,
        medium,
        setMedium,
      }}
    >
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "keyframes", duration: 0.4 }}
              onClick={() => setShowCart(false)}
              className="w-screen h-screen bg-black/30 fixed top-0 z-40"
            ></motion.div>
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: "keyframes", duration: 0.4 }}
              className="h-screen w-[400px] overflow-y-scroll bg-white fixed z-50 right-0 top-0 pt-10 px-5"
            >
              <div className="flex justify-between items-center h-[5%]">
                <h1
                  className={
                    "text-xl font-semibold " + BRILLANT_REGULAR.className
                  }
                >
                  Cart
                </h1>
                <span className="text-xl">
                  <Icon
                    icon="material-symbols:close-rounded"
                    onClick={() => {
                      setShowCart(false);
                    }}
                  />
                </span>
              </div>
              <div className="flex flex-col gap-5 h-[80%] overflow-y-scroll overflow-x-hidden">
                <AnimatePresence>
                  {cart.map((item, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{
                        type: "keyframes",
                        duration: 0.6,
                        delay: index * 0.2,
                      }}
                      key={index}
                      className="flex justify-between items-center p-2 rounded-md bg-product"
                    >
                      <div className="flex gap-2 items-center">
                        <div className="w-24 h-24 bg-white rounded-lg">
                          <Image
                            src={item.image}
                            width={96}
                            height={96}
                            className="w-full h-full object-contain"
                            alt="cart-item"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <h1 className="text-md font-bold">{item.title}</h1>
                          {/* <p className="text-sm">{item.}</p> */}
                          <p className="text-primary font-bold">
                            Rs. {item.unitCost}/-
                          </p>
                        </div>
                      </div>
                      <div>
                        <span
                          onClick={() => increaseItem(String(item.product))}
                          className="h-5 w-5 rounded bg-white cursor-pointer hover:text-primary flex justify-center items-center"
                        >
                          +
                        </span>
                        <span className="h-5 w-5 rounded flex justify-center items-center">
                          {item.quantity}
                        </span>
                        <span
                          onClick={() => decreaseItem(String(item.product))}
                          className="h-5 w-5 rounded bg-white cursor-pointer hover:text-primary flex justify-center items-center"
                        >
                          -
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="bg-white w-full h-[15%] flex items-center">
                <Button
                  className="text-white bg-primary w-full rounded"
                  onClick={confirmOrder}
                  text="Check Out"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): ICartContext => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
