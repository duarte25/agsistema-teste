import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import { fetchApi } from "@/utils/fetchApi";

export default function Produtos({ data, setData, onEditProduct }) {
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
        <div className="space-y-4"> 
            {Array.isArray(data) && data.length > 0 ? (
                data.map((produto, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 p-4 flex justify-between items-center"
                    >

                        <div className="flex flex-col text-left">
                            <h3 className="font-bold text-lg">Nome: {produto.nome}</h3>
                            <p className="text-sm">Descrição: {produto.descricao}</p>
                            <span className="text-sm font-semibold text-gray-800">Preço: R${produto.preco}</span>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => handleDelete(produto.id)}
                                disabled={loading}
                                className="bg-none border-none cursor-pointer"
                            >
                                <FaRegTrashAlt className="text-gray-950 text-xl" />
                            </button>
                            <button
                                onClick={() => onEditProduct(produto)}
                                className="bg-none border-none cursor-pointer"
                            >
                                <MdOutlineEdit className="text-gray-950 text-xl" />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Nenhum item encontrado.</p>
            )}
        </div>
    );
}
