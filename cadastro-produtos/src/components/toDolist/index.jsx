import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchApi } from '@/utils/fetchApi';
import Produtos from '../produtos';

const TodoList = () => {
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
      <Produtos
        data={data?.data}
      />
    </div>
  );
};

export default TodoList;