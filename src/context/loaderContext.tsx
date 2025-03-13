import { AnimatePresence, motion } from "framer-motion";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface IUtilityProvider {
  children: ReactNode;
}
interface IUtilityContext {
  setLoading: any;
  toast: (message: string, verient?: "success" | "error" | "alert") => void;
}
const UtilityContext = createContext<IUtilityContext | undefined>(undefined);
export const UtilityProvider: React.FC<IUtilityProvider> = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [verient, setVerient] = useState<"success" | "error" | "alert">(
    "success"
  );
  const [toastStyle, setToastStyle] = useState<string>("");
  const toast = (message: string, varient?: "success" | "error" | "alert") => {
    setShowToast(true);
    setToastMessage(message);
    varient && setVerient(varient);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage("");
      setVerient("success");
    }, 4000);
  };
  useEffect(() => {
    switch (verient) {
      case "success": {
        setToastStyle("bg-white text-primary");
        break;
      }
      case "error": {
        setToastStyle("text-red-800");
        break;
      }
      case "alert": {
        setToastStyle("bg-primary text-white");
        break;
      }
      default: {
        setToastStyle("text-black");
        break;
      }
    }
  }, [verient]);
  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (isLoading) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }
  }, [isLoading]);
  return (
    <UtilityContext.Provider
      value={{
        setLoading,
        toast,
      }}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, type: "keyframes" }}
            className="w-screen h-screen flex justify-center items-center loader backdrop-blur-sm"
          >
            <div className="lds-dual-ring"></div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, type: "keyframes" }}
            className={`fixed top-5 right-5 ${toastStyle} overflow-hidden p-5 py-2 shadow-xl w-fit rounded-lg border z-[999] min-w-[300px] bg-white`}
          >
            <span className="uppercase">{verient}</span>
            <p className="capitalize">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </UtilityContext.Provider>
  );
};

export const useUtility = (): IUtilityContext => {
  const context = useContext(UtilityContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
