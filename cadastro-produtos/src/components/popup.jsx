import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { fetchApi } from '@/utils/fetchApi';
import { toast } from 'react-toastify';

export default function PopupProduto({ isOpen, onClose, onSave }) {
  const [product, setProduct] = useState({
    nome: "",
    descricao: "",
    preco: "",
  });

  const handleChange = (field, value) => {
    if (field === 'preco') {
      const parsedValue = parseFloat(value);
      value = isNaN(parsedValue) ? "" : parsedValue;
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  async function cadas(data) {
    try {
      const response = await fetchApi("/produtos", "POST", data);

      if (response.error) {

        response.errors.forEach((err) => {
          toast.error(err.message || "Erro ao cadastrar produto!");
        });
      } else {
        toast.success("Produto cadastrado com sucesso!");
        onSave && onSave(data); 
        onClose(); 
      }
    } catch (error) {
      toast.error("Erro ao cadastrar produto!");
    }
  }

  const handleSave = () => {
    const validProduct = {
      nome: product.nome.trim(),
      preco: parseFloat(product.preco),
      descricao: product.descricao.trim(),
    };

    if (!validProduct.nome || !validProduct.descricao || isNaN(validProduct.preco)) {
      toast.error("Por favor, preencha todos os campos corretamente!");
      return;
    }

    cadas(validProduct);
  };

  return (
    <Popup open={isOpen} onClose={onClose} modal nested>
      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Adicionar Produto</h2>
        <label>
          Nome:
          <input
            className='text-black'
            type="text"
            value={product.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
          />
        </label>
        <br />
        <label>
          Descrição:
          <textarea
            className='text-black'
            value={product.descricao}
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
            value={product.preco}
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
