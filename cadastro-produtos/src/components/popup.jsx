import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { fetchApi } from '@/utils/fetchApi';
import { toast } from 'react-toastify';

export default function PopupProduto({ isOpen, onClose, onSave, product, isEdit }) {
  const [productData, setProductData] = useState({
    nome: "",
    descricao: "",
    preco: "",
  });

  useEffect(() => {
    if (product && isEdit) {
      setProductData({
        nome: product.nome,
        descricao: product.descricao,
        preco: product.preco.toString(),
      });
    }
  }, [product, isEdit]);

  const handleChange = (field, value) => {
    if (field === 'preco') {
      let parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        value = "";
      } else {
        value = parsedValue.toFixed(2);
      }
    }

    setProductData((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  async function saveProduct(data) {
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `/produtos/${product.id}` : '/produtos';
      const response = await fetchApi(url, method, data);
     
      if (response.error) {
        response.errors.forEach((err) => {
          toast.error(err.message || "Erro ao salvar produto!");
        });
      } else {
        toast.success(`${isEdit ? 'Produto atualizado' : 'Produto cadastrado'} com sucesso!`);
        onSave && onSave(data);
        onClose();
      }
    } catch (error) {
      toast.error("Erro ao salvar produto!");
    }
  }

  const handleSave = () => {
    const validProduct = {
      nome: productData.nome.trim(),
      preco: parseFloat(productData.preco), 
      descricao: productData.descricao.trim(),
    };

    if (!validProduct.nome || !validProduct.descricao || isNaN(validProduct.preco)) {
      toast.error("Por favor, preencha todos os campos corretamente!");
      return;
    }

    saveProduct(validProduct);
  };

  return (
    <Popup open={isOpen} onClose={onClose} modal nested>
      <div className="p-5 max-w-sm mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-zinc-950">{isEdit ? 'Editar Produto' : 'Adicionar Produto'}</h2>
        <label className="block mb-2 text-zinc-950">
          Nome:
          <input
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            type="text"
            value={productData.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
          />
        </label>
        <br />
        <label className="block mb-2 text-zinc-950">
          Descrição:
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            value={productData.descricao}
            onChange={(e) => handleChange('descricao', e.target.value)}
          ></textarea>
        </label>
        <br />
        <label className="block mb-2 text-zinc-950">
          Preço:
          <input
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            type="number"
            step="0.01"
            value={productData.preco}
            onChange={(e) => handleChange('preco', e.target.value)}
          />
        </label>
        <br />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
          >
            Salvar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Popup>
  );
}
