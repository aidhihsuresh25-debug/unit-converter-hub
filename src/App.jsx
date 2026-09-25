import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import History from "./pages/History";
import About from "./pages/About";
import { ThemeProvider } from "./context/ThemeContext";
import { categories } from "./data/units";

function Layout() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  return (
    <div className="app-shell">
      <Sidebar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <Routes>
        <Route
          path="/"
          element={<Home key={activeCategory} categoryId={activeCategory} />}
        />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
