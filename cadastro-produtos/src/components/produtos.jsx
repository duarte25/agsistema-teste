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
        <div>
            {Array.isArray(data) && data.length > 0 ? (
                data.map((produto, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 p-2 flex flex-row justify-around"
                    >
                        <div className="text-start">
                            <h3 className="font-bold">Nome: {produto.nome}</h3>
                            <p>Descrição: {produto.descricao}</p>
                            <span>Preço: R${produto.preco}</span>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={() => handleDelete(produto.id)}
                                disabled={loading}
                                className="bg-none border-none cursor-pointer mr-2"
                            >
                                <FaRegTrashAlt className="text-gray-950 size-10" />
                            </button>
                            <button
                                onClick={() => onEditProduct(produto)}
                                className="bg-none border-none cursor-pointer"
                            >
                                <MdOutlineEdit className="text-gray-950 size-10" />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Nenhum item encontrado.</p>
            )}
        </div>
    );
}
