import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchApi } from '@/utils/fetchApi';
import Produtos from './produtos';
import PopupProduto from './popup';
import { Loader2 } from 'lucide-react';

const TodoList = () => {
  const [isOpen, setIsOpen] = useState(false);  // Controla o popup
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
    if (!isOpen && !editingProduct) {
      refetch();
    }
  }, [isOpen, editingProduct, refetch]);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsOpen(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsOpen(true);
  };

  // Função chamada após salvar o produto, adicionar ou editar
  const handleSaveProduct = (updatedProduct) => {
    setData((prevData) => {
      if (updatedProduct.id) {
        return prevData.map((produto) =>
          produto.id === updatedProduct.id ? updatedProduct : produto
        );
      }
      return [...prevData, updatedProduct];
    });
    setEditingProduct(null);
    setIsOpen(false);
  };

  return (
    <div className="w-3/4 flex flex-col text-center">
      <h1 className="text-4xl text-slate-800">Lista de Produtos</h1>

      {isOpen && <div className="fixed top-0 left-0 w-full h-full bg-white/80 z-10"></div>}

      <PopupProduto
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        isEdit={Boolean(editingProduct)}
      />

      {isLoading ? (
        <div className="fixed inset-0 flex justify-center items-center z-[10] bg-white bg-opacity-50">
          <Loader2 className="h-32 w-32 animate-spin text-slate-600" />
        </div>
      ) : (
        <Produtos data={data} setData={setData} onEditProduct={handleEditProduct} />
      )}

      <button
        className="mt-[5%] rounded-[8px] bg-blue-700 border-none w-full h-[3.9rem] text-white font-normal text-[1.6rem]"
        onClick={handleAddProduct}
      >
        Adicionar produto
      </button>
    </div>
  );
};

export default TodoList;
