// components/TodoItem.js
import React from 'react';
import { FiTrash } from "react-icons/fi";

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div  >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <div
        
        style={{ textDecoration: todo.completed ? 'line-through' : 'none',
          opacity: todo.completed ? 0.54 : 1
         }}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </div>
      <div >
          <FiTrash onClick={() => deleteTodo(todo.id)}/>
      </div>
    </div>
  );
};

export default TodoItem;