import React, { useState } from "react";

const Child = ({ handleIncrementCount }) => {
 
  return (
    <div>
      <h1>Counter At Child</h1>

      <button onClick={handleIncrementCount} className="py-2 px-4 bg-blue-400 text-white rounded">+ ADD</button>
    </div>
  );
};

export default Child;
