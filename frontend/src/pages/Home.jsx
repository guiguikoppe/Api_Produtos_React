function Home() {
  return (
    <div className="container">
      <section className="card">
        <h1>Sistema de Gerenciamento de Produtos</h1>

        <p>
          Bem-vindo ao sistema completo de controle de produtos.
          Aqui você pode cadastrar, visualizar, editar, excluir
          e buscar produtos de forma rápida, prática e organizada.
        </p>

        <p>
          O projeto foi desenvolvido para facilitar o gerenciamento
          de estoque e demonstrar a integração entre front-end e
          back-end com API real e banco de dados PostgreSQL.
        </p>
      </section>

      <section className="card">
        <h2>Funcionalidades do Sistema</h2>

        <p>✔ Cadastro de novos produtos</p>
        <p>✔ Listagem completa dos produtos</p>
        <p>✔ Busca por nome ou ID</p>
        <p>✔ Edição de informações</p>
        <p>✔ Exclusão com confirmação</p>
        <p>✔ Integração com PostgreSQL</p>
      </section>

      <section className="card">
        <h2>Tecnologias Utilizadas</h2>

        <p>⚛ React + Vite</p>
        <p>🌐 Node.js + Express</p>
        <p>🐘 PostgreSQL</p>
        <p>🔀 React Router</p>
        <p>🎨 CSS moderno e responsivo</p>
      </section>
    </div>
  );
}

export default Home;
