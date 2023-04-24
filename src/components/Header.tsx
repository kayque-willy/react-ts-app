
export function Header() {

  // ------------------- Renderiza o componente passando o props por parâmetro -------------------
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Home </a>
          </li>
          <li>
            <a href="/about">About </a>
          </li>
        </ul>
      </nav>
      <h1>App - React</h1>
      <h2>Twitter</h2>
    </header>
  );
}