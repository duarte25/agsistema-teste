import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchApi } from '@/utils/fetchApi'; 
import Produtos from '../produtos'; 
import PopupProduto from '../popup';

const TodoList = () => {
  const [isAdding, setIsAdding] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getProduto"],
    queryFn: async () => {
      const response = await fetchApi("/produtos", "GET");
      return response;
    }
  });

  useEffect(() => {
    if (!isAdding) {
      refetch();
    }
  }, [isAdding, refetch]);

  return (
    <div className="pt-96">
      <h1>Lista de Produtos</h1>
      <button onClick={() => setIsAdding(true)}>Adicionar Produto</button>

      <PopupProduto
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
      />

      {isLoading ? <p>Carregando...</p> : <Produtos data={data?.data} />}
    </div>
  );
};

export default TodoList;
