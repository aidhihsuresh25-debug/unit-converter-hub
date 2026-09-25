import { NavLink } from "react-router-dom";
import { LayoutGrid, History, Info, Sun, Moon, Boxes } from "lucide-react";
import { categories } from "../data/units";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar({ activeCategory, onSelectCategory }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <Boxes size={18} />
        </div>
        <div>
          <div className="brand-text">UnitHub</div>
          <div className="brand-sub">Conversion Dashboard</div>
        </div>
      </div>

      <nav>
        <div className="nav-section-label">Menu</div>
        <div className="nav-pages">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <LayoutGrid size={16} /> Converter
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <History size={16} /> History
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <Info size={16} /> About
          </NavLink>
        </div>
      </nav>

      <nav style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <div className="nav-section-label">Categories</div>
        <div className="category-list">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                className={`category-btn${isActive ? " active" : ""}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <Icon size={16} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </div>
    </aside>
  );
}
