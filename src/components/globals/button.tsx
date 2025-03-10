import React from "react";
import SwipableTextButton from "./SwipableTextButton";

const Button = ({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button onClick={onClick} className={`group h-[60px] w-[200px] ${className}`}>
      <div className={`overflow-hidden h-[24px]`}>
        <div className="flex flex-col transition-all duration-500 group-hover:-translate-y-1/2 capitalize">
          <span>{text}</span>
          <span>{text}</span>
        </div>
      </div>
    </button>
  );
};

export default Button;
