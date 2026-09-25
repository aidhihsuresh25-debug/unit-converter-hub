# UnitHub — Smart Unit Converter Dashboard

A frontend-only unit conversion dashboard built with React + Vite.
No backend, database, or API — every calculation runs in the browser,
and the last 10 conversions are saved to `localStorage`.

## Categories
Length, Weight, Temperature, Time, Volume, Area.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

## Project structure

```
src/
  components/Sidebar.jsx      sidebar nav + category switcher + theme toggle
  context/ThemeContext.jsx    dark/light mode, persisted to localStorage
  data/units.js                unit definitions and conversion factors
  pages/Home.jsx               converter workspace
  pages/History.jsx            last 10 conversions
  pages/About.jsx               how it works
  utils/convert.js             conversion + formula logic
  utils/storage.js             localStorage helpers (history, count, theme)
```
