import React from "react";

const ActionButtons = ({handleFilter}) => {
  return (
    <div className="actionButtons">
      <button
        onClick={() => handleFilter('All')}
        type="button"
        className="text-sm font-semibold mx-2 text-primary opacity-70 hover:opacity-100"
      >
        All
      </button>
      <button
        onClick={() => handleFilter('Active')}
        type="button"
        className="text-sm font-semibold mx-2 text-gray-400 hover:text-gray-700"
      >
        Active
      </button>
      <button
        onClick={() => handleFilter('Completed')}
        type="button"
        className="text-sm font-semibold mx-2 text-gray-400 hover:text-gray-700"
      >
        Completed
      </button>
    </div>
  );
};

export default ActionButtons;
