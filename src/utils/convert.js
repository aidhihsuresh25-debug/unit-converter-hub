import { getCategory } from "../data/units";

// --- Temperature needs its own formulas, everything else is linear ---

function toCelsius(value, unit) {
  if (unit === "celsius") return value;
  if (unit === "fahrenheit") return ((value - 32) * 5) / 9;
  if (unit === "kelvin") return value - 273.15;
  return value;
}

function fromCelsius(value, unit) {
  if (unit === "celsius") return value;
  if (unit === "fahrenheit") return (value * 9) / 5 + 32;
  if (unit === "kelvin") return value + 273.15;
  return value;
}

function temperatureFormula(fromUnit, toUnit) {
  const key = `${fromUnit}->${toUnit}`;
  const formulas = {
    "celsius->fahrenheit": "(°C × 9/5) + 32",
    "celsius->kelvin": "°C + 273.15",
    "fahrenheit->celsius": "(°F − 32) × 5/9",
    "fahrenheit->kelvin": "(°F − 32) × 5/9 + 273.15",
    "kelvin->celsius": "K − 273.15",
    "kelvin->fahrenheit": "(K − 273.15) × 9/5 + 32",
  };
  return formulas[key] || `${fromUnit} = ${toUnit}`;
}

export function convertValue(categoryId, fromUnit, toUnit, rawValue) {
  const category = getCategory(categoryId);
  const value = parseFloat(rawValue);

  if (Number.isNaN(value) || !category) {
    return { result: null, formula: "" };
  }

  if (categoryId === "temperature") {
    const celsius = toCelsius(value, fromUnit);
    const result = fromCelsius(celsius, toUnit);
    return {
      result,
      formula: temperatureFormula(fromUnit, toUnit),
    };
  }

  const fromFactor = category.units[fromUnit].factor;
  const toFactor = category.units[toUnit].factor;
  const result = (value * fromFactor) / toFactor;
  const ratio = fromFactor / toFactor;

  const formula =
    ratio === 1
      ? `${fromUnit} = ${toUnit}`
      : `${fromUnit} × ${trimNumber(ratio)} = ${toUnit}`;

  return { result, formula };
}

export function trimNumber(num) {
  if (num === null || num === undefined || Number.isNaN(num)) return "—";
  if (Math.abs(num) >= 1e9 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(4);
  }
  const rounded = Math.round(num * 1e6) / 1e6;
  return rounded.toString();
}
