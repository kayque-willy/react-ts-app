export function Footer() {

  let data = new Date();

  // ------------------- Renderiza o componente passando o props por parâmetro -------------------
  return (
    <footer> © {data.getFullYear()} - Author:
      <a href="https://github.com/kayque-willy"> Kayque Oliveira</a>
    </footer>
  );
}