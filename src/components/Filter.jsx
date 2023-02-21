import React from "react";

const Filter = () => {
  return (
    <div className="mt-4 ml-10 max-sm:space-x-2 no-scrollbar max-sm:overflow-auto">
      <ul className="flex items-center space-x-3">
        <li className="bg-gray-200 text-center py-2 px-4 rounded-md">
          <button>Mountain</button>
        </li>
        <li className="bg-gray-200 text-center py-2 px-4 rounded-md">
          <button>flowers</button>
        </li>
        <li className="bg-gray-200 text-center py-2 px-4 rounded-md">
          <button>motorcycles</button>
        </li>
        <li className="bg-gray-200 text-center py-2 px-4 rounded-md">
          <button>photography</button>
        </li>
        <li className="bg-gray-200 text-center py-2 px-4 rounded-md">
          <button>travel</button>
        </li>
        <li className="bg-gray-200 text-center py-2 px-4 rounded-md">
          <button>winter</button>
        </li>
      </ul>
    </div>
  );
};

export default Filter;
