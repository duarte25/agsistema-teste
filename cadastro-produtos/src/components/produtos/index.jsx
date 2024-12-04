export default function Produtos({ data }) {

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
                    </div>
                ))
            ) : (
                <p>Nenhum item encontrado.</p>
            )}
        </div>
    )
}