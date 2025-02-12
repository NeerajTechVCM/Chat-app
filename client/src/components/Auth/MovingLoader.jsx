import React from "react";

const MovingLoader = () => {
  return (
    <div className="flex justify-center items-center">
    <div className="w-64 h-2 bg-gray-300 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r animate-round rounded-md bg-slate-300  "></div>
    </div>
  </div>
  );
};

export default MovingLoader;
