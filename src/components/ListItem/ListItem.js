import React from "react";
import CheckIcon from "../../images/icon-check.svg";
import "./ListItem.css";

const ListItem = ({
  item,
  i,
  handleClick,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  dragAndDrop
}) => {
  return (
    <>
      <li
        draggable
        onDragStart={onDragStart}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDragEnter={onDragStart}
        data-position={i}
        key={item.id}
        className={ dragAndDrop && dragAndDrop.draggedTo === Number(i) ? 
          `dropArea flex justify-start items-center transition-all ease-out p-3 w-full border-b-2 border-gray-400 hover:bg-gray-50`
          : `flex justify-start items-center transition-all ease-out p-3 w-full border-b-2 border-gray-400 hover:bg-gray-50`}
      >
      {!item.isDone ? <button onClick={() => handleClick(item.id)} type="button" className="w-5 h-5 border-2 border-gray-300 hover:border-primary rounded-full mr-3" /> 
      : <button onClick={() => handleClick(item.id)} type="button" className="myListItem w-5 h-5 rounded-full mr-3 flex justify-center items-center">
        <img src={CheckIcon} alt="" />
      </button>}

      {!item.isDone ? 
        <button className="w-full text-left p-1 text-lg text-gray-500 font-semibold">
          {item.text}
        </button> : 
        <button className="w-full text-left p-1 text-lg text-gray-500 font-semibold line-through">
          {item.text}
        </button>
      }
      </li>
    </>
  );
};

export default ListItem;
