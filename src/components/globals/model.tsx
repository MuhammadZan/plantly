import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
interface modelProps {
  componenet: React.ReactNode;
  className?: string;
  visible: boolean;
  setVisible: any;
}
const Model: React.FC<modelProps> = ({
  componenet,
  className,
  visible,
  setVisible,
}) => {
  useEffect(() => {
    if (visible) {
      const body = document.querySelector("body");
      if (body) {
        body.style.overflow = "hidden";
      }
    } else {
      const body = document.querySelector("body");
      if (body) {
        body.style.overflow = "auto";
      }
    }
  }, [visible]);
  return (
    <AnimatePresence>
      {visible && (
        <div className="h-screen w-screen fixed top-0 left-0 z-50 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, type: "keyframes" }}
            className="absolute z-10 bg-[#ffffff83] h-full w-full backdrop-blur-sm"
            onClick={() => {
              setVisible(false);
            }}
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, type: "keyframes" }}
            className={`absolute z-20 bg-white rounded-lg min-w-[550px] min-h-[500px] h-fit overflow-x-hidden overflow-y-scroll border ${className} shadow-xl`}
          >
            <div className="flex justify-end">
              <span
                onClick={() => setVisible(false)}
                className="text-primary font-bold absolute top-5 cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 right-5 px-3 py-2 border rounded-md"
              >
                X
              </span>
            </div>
            {componenet}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Model;
