import React from "react";
import { Icon } from "@iconify/react";
const Global = () => {
  return (
    <div className="flex justify-center items-center flex-col h-[400px]">
      <div className="bg-primary rounded-2xl p-5">
        <Icon icon="stash:globe-light" className="h-16 w-16 text-white" />
      </div>
      <h1 className="text-2xl mt-5">This page is under development</h1>
    </div>
  );
};

export default Global;
