// components/TodoItem.js
import React from 'react';
import { FiTrash } from "react-icons/fi";

const TodoItem = ({ todo, toggleComplete }) => {

  console.log("TODO", todo)

  return (
    <div  >
      <input
        type="checkbox"
      />
      <div>
        {todo[0].nome}
      </div>
    </div>
  );
};

export default TodoItem;