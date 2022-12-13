import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { TweetView } from "./pages/TweetView";
import { TweetForm } from "./pages/TweetForm";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<TweetForm />} />
        <Route path="/view" element={<TweetView />} />
      </Routes>
    </Router>
  );
}
