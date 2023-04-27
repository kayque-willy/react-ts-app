import Message from "../components/Message";

export function About() {

  // ------------------- Renderiza o componente passando o props por parâmetro -------------------
  return (
    <main>
      <section>
        <Message
          id={1}
          title={"Twitter"}
          text={
            "Este é um exemplo de aplicativo React criado com Vite usando Typescript, Hooks, Armazenamento local e Routes. " +
            "Os tweets que são gerados automaticamente utlizam informações de frases e autores coletadas na API:"
          }
          link={"https://quote-garden.onrender.com/api/v3/"}
        />
      </section>
    </main>
  );
}