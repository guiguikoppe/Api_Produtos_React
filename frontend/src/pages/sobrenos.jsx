import avatar from "../img/MEN'S_CAVES.png";

function Sobre() {
  return (
    <div className="container">
      
      <section className="card">
        <h1>Sobre Nós</h1>

        <p>
          Este sistema foi desenvolvido com o objetivo de facilitar o
          gerenciamento de produtos de forma simples, rápida e eficiente.
        </p>

        <p>
          A ideia surgiu da necessidade de organizar estoque, controlar
          informações importantes e aplicar, na prática, conceitos de
          desenvolvimento web moderno.
        </p>
      </section>

      <section className="card">
        <h2>Nosso Objetivo</h2>

        <p>
          Nosso principal objetivo é oferecer uma ferramenta prática
          para cadastro, controle e visualização de produtos, ajudando
          usuários a manterem suas informações organizadas.
        </p>

        <p>
          Além disso, o projeto também serve como base de aprendizado
          para integração entre front-end e back-end.
        </p>
      </section>

      <section className="card">
        <h2>Sobre o Projeto</h2>

        <p>
          O sistema foi construído utilizando tecnologias modernas,
          com foco em desempenho, organização e escalabilidade.
        </p>

        <p>
          Ele permite realizar operações completas de CRUD
          (Create, Read, Update, Delete), garantindo uma experiência
          fluida e intuitiva para o usuário.
        </p>
      </section>

      <section className="card">
        <h2>Desenvolvedores</h2>

        <img
          src={avatar}
          alt="Foto do Desenvolvedor"
          className="avatar"
        />

        <p style={{ textAlign: "center", marginTop: "10px" }}>
Men`s Caves            </p>
      </section>

    </div>
  );
}

export default Sobre;