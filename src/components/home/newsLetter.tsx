import React from "react";
import Button from "../globals/button";

const NewsLetter = () => {
  return (
    <div className="w-2/3 mx-auto mt-10 rounded-md bg-white p-10">
      <h1 className="text-xl font-primary font-semibold">News Letter</h1>
      <div className="flex gap-5 mt-3">
        <input
          type="email"
          className="p-3 border w-full focus:border-primary outline-none transition-all duration-200"
          placeholder="Email here"
        />
        <Button text="Subscrie" className="bg-primary text-white" />
      </div>
    </div>
  );
};

export default NewsLetter;
