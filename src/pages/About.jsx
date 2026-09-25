import { categories } from "../data/units";

export default function About() {
  return (
    <div className="workspace">
      <div className="topbar">
        <div>
          <div className="page-title">About UnitHub</div>
          <div className="page-subtitle">How the converter works, and what it covers.</div>
        </div>
      </div>

      <div className="card prose">
        <p>
          UnitHub is a frontend-only conversion dashboard built with React and
          Vite. Every calculation runs directly in the browser: values are
          multiplied against a base-unit factor (for example, metres for
          length or grams for weight), so there is no server, database, or
          API involved anywhere in the app.
        </p>
        <p>
          Temperature is the one exception, since Celsius, Fahrenheit, and
          Kelvin don't share a simple multiplier — those conversions use the
          standard linear formulas instead. Whatever the category, the
          formula used for your last conversion is always shown on the
          Converter page so you can see the maths, not just the answer.
        </p>
        <p>
          Your last 10 conversions are saved to your browser's local storage,
          so they're private to your device and persist between visits — but
          they're never sent anywhere.
        </p>
      </div>

      <div className="about-grid">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const unitList = Object.values(cat.units)
            .map((u) => u.symbol)
            .join(" · ");
          return (
            <div className="card about-card" key={cat.id}>
              <h3>
                <Icon size={16} style={{ verticalAlign: "-3px", marginRight: 6 }} />
                {cat.label}
              </h3>
              <p>{unitList}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
