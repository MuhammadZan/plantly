import Results from "@/components/search/results";
import React from "react";

const Search = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-[300px] p-8 shadow-md shadow-black/20">
        <h1 className="text-xl font-semibold">Filter</h1>
        <h2 className="text-md font-semibold mt-5">Category</h2>
        <div className="mt-5">
          <div>
            <input type="checkbox" /> Category 1
          </div>
          <div>
            <input type="checkbox" /> Category 1
          </div>
          <div>
            <input type="checkbox" /> Category 1
          </div>
          <div>
            <input type="checkbox" /> Category 1
          </div>
          <div>
            <input type="checkbox" /> Category 1
          </div>
        </div>
        <h2 className="text-md font-semibold mt-5">Price Range</h2>
        <input type="range" name="" className="w-full" id="" />
      </div>
      <div className="w-full flex h-full overflow-y-scroll">
        <Results />
      </div>
    </div>
  );
};

export default Search;
