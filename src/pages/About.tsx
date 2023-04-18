import Message from "../components/Message";

export function About() {
  // Renderiza o componente passando o props por parâmetro
  return (
    <main>
      <header>
        <h1>App - React TypeScript</h1>
      </header>
      <section>
        <Message
          id={1}
          title={"Twitter"}
          text={
            "Exemplo de aplicativo React criado com Vite usando Typescript, Hooks, Armazenamento local e Routes"
          }
        />
      </section>
    </main>
  );
}