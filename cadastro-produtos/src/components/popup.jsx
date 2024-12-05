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
      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h2>{isEdit ? 'Editar Produto' : 'Adicionar Produto'}</h2>
        <label>
          Nome:
          <input
            className='text-black'
            type="text"
            value={productData.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
          />
        </label>
        <br />
        <label>
          Descrição:
          <textarea
            className='text-black'
            value={productData.descricao}
            onChange={(e) => handleChange('descricao', e.target.value)}
          ></textarea>
        </label>
        <br />
        <label>
          Preço:
          <input
            className='text-black'
            type="number"
            step="0.01"
            value={productData.preco}
            onChange={(e) => handleChange('preco', e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleSave} style={{ marginRight: '10px' }}>
          Salvar
        </button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </Popup>
  );
}
