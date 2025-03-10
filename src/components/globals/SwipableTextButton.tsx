import React from "react";

const SwipableTextButton = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <div className={`overflow-hidden h-[20px] ${className}`}>
    <div className="flex flex-col transition-all duration-500 hover:-translate-y-1/2 capitalize">
      <span>{text}</span>
      <span>{text}</span>
    </div>
  </div>
);

export default SwipableTextButton;
