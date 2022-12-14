import "./assets/App.css";
import { AppRoutes } from "./Routes";

function App() {
  return (
    <div>
      <nav>
        <a href="/">Home </a>
        <a href="/about">About </a>
      </nav>
      <AppRoutes />
    </div>
  );
}

export default App;
