import "./assets/App.css";
import "./assets/Button.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import { AppRoutes } from "./Routes";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
