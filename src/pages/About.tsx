import Message from "../components/Message";

export function About() {
  // Renderiza o componente passando o props por parâmetro
  return (
    <>
      <h1>App - React TypeScript</h1>
      <Message
        id={1}
        title={"Twitter"}
        text={
          "Exemplo de aplicativo React criado com Vite usando Typescript,Armazenamento local e Routes"
        }
      />
    </>
  );
}