import "./App.css";
import { AppRoutes } from "./Routes";

function App() {
  return (
    <div>
      <nav>
        <a href="/">Home </a>
        <a href="/cart">Cart </a>
        <a href="/catalog">Catalog</a>
      </nav>
      <AppRoutes />
    </div>
  );
}

export default App;
