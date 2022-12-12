import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Catalog } from "./pages/Catalog";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/catalog" element={<Catalog/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </Router>
  );
}
