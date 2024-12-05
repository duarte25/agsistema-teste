import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import { fetchApi } from "@/utils/fetchApi";

export default function Produtos({ data, setData }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            
            const response = await fetchApi(`/produtos/${id}`, 'DELETE');
            
            if (!response.error) {
                toast.success("Produto deletado com sucesso!");

                const updatedData = data.filter((produto) => produto.id !== id);
                setData(updatedData);  
            } else {
                toast.error("Erro ao deletar o produto.");
            }
        } catch (error) {
            toast.error("Ocorreu um erro ao tentar deletar o produto.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {Array.isArray(data) ? (
                data.map((produto) => (
                    <div key={produto.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
                        <div>
                            <h3>{produto.nome}</h3>
                            <p>{produto.descricao}</p>
                            <span>Preço: R${produto.preco}</span>
                        </div>
                        <button 
                            onClick={() => handleDelete(produto.id)} 
                            disabled={loading}
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <FaRegTrashAlt color="red" />
                        </button>
                        <button 
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <MdOutlineEdit color="blue" />
                        </button>
                    </div>
                ))
            ) : (
                <p>Nenhum item encontrado.</p>
            )}
        </div>
    );
}
