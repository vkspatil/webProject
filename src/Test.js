import React, { useState } from "react";

const Test = ({ handleIncrementCount }) => {

  return (
    <div>
      <h1>Counter At Test</h1>

      <button onClick={handleIncrementCount} className="py-2 px-4 bg-blue-400 text-white rounded">+ ADD</button>
    </div>
  );
};

export default Test;
