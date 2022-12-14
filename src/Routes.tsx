import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { About } from "./pages/About";
import { TweetForm } from "./pages/TweetForm";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<TweetForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
