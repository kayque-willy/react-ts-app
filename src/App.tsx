import "./assets/App.css";
import { AppRoutes } from "./Routes";

function App() {
  return (
    <>
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
      <AppRoutes />
      <footer> © 2023 - Author: <a href="https://github.com/kayque-willy">Kayque Oliveira</a></footer>
    </>
  );
}

export default App;
