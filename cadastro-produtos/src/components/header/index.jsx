export default function Header() {
    const dataAtual = new Date();
    const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR', opcoes);

    return (
        <header>
            <h1>Bem-vindo de volta, Marcus</h1>
            <h2>{dataFormatada}</h2>
        </header>
    );
}