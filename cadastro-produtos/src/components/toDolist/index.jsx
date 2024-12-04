import React, { useState, useEffect } from 'react';
import TodoItem from '../tasks';
import TodoPopup from '../popup';
import { useQuery } from 'react-query';
import { fetchApi } from '@/utils/fetchApi';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getProduto"],
    queryFn: async () => {
      const response = await fetchApi("/produtos", "GET");

      return response;
    }
  });

  console.log("DATA", data)

  return (
    <div >
      <TodoPopup
 
      />

      <div >
        <h3>Suas tarefas de hoje</h3>

        <TodoItem
            key={data?.data}
            todo={data?.data}
            toggleComplete={toggleComplete}
          />

      </div>

      <button onClick={() => setIsAdding(true)}>
        Adicionar nova tarefa
      </button>

    </div>
  );
};

export default TodoList;