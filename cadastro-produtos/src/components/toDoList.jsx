import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchApi } from '@/utils/fetchApi';
import Produtos from './produtos';
import PopupProduto from './popup';

const TodoList = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [data, setData] = useState([]); 

  const { isLoading, refetch } = useQuery({
    queryKey: ["getProduto"],
    queryFn: async () => {
      const response = await fetchApi("/produtos", "GET");
      return response;
    },
    onSuccess: (response) => {
      setData(response?.data || []); 
    }
  });

  useEffect(() => {
    if (!isAdding && !editingProduct) {
      refetch();
    }
  }, [isAdding, editingProduct, refetch]);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsAdding(true); 
  };

  // Função chamada após salvar o produto (adicionar ou editar)
  const handleSaveProduct = (updatedProduct) => {
    setData((prevData) => {
      // Se o produto foi editado, substituímos o item correspondente
      if (updatedProduct.id) {
        return prevData.map((produto) =>
          produto.id === updatedProduct.id ? updatedProduct : produto
        );
      }
      // Se for um novo produto, apenas adicionamos à lista
      return [...prevData, updatedProduct];
    });
    setEditingProduct(null); 
    setIsAdding(false);
  };

  return (
  <div className="w-3/4 flex flex-col text-center" >
      <h1 className="text-4xl text-slate-800">Lista de Produtos</h1>

      {isAdding && <div className="fixed top-0 left-0 w-full h-full bg-white/80 z-10"></div>}

      <PopupProduto
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        isEdit={Boolean(editingProduct)}
      />
      
      {isLoading ? <p>Carregando...</p> : <Produtos data={data} setData={setData} onEditProduct={handleEditProduct} />}
      
      <button className="mt-[5%] rounded-[8px] bg-blue-700 border-none w-full h-[3.9rem] text-white font-normal text-[1.6rem]" onClick={() => setIsAdding(true)}>Adicionar produto</button>
    </div>
  );
};

export default TodoList;
