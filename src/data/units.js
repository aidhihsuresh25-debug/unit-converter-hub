import {
  Ruler,
  Weight,
  Thermometer,
  Clock,
  Droplets,
  Square,
} from "lucide-react";

// Each category has a base unit. Linear categories store a factor
// that converts 1 unit -> base unit. Temperature is handled specially
// in utils/convert.js because it isn't a simple multiplication.

export const categories = [
  {
    id: "length",
    label: "Length",
    icon: Ruler,
    base: "m",
    units: {
      mm: { label: "Millimetre", symbol: "mm", factor: 0.001 },
      cm: { label: "Centimetre", symbol: "cm", factor: 0.01 },
      m: { label: "Metre", symbol: "m", factor: 1 },
      km: { label: "Kilometre", symbol: "km", factor: 1000 },
      inch: { label: "Inch", symbol: "in", factor: 0.0254 },
      foot: { label: "Foot", symbol: "ft", factor: 0.3048 },
    },
  },
  {
    id: "weight",
    label: "Weight",
    icon: Weight,
    base: "g",
    units: {
      mg: { label: "Milligram", symbol: "mg", factor: 0.001 },
      g: { label: "Gram", symbol: "g", factor: 1 },
      kg: { label: "Kilogram", symbol: "kg", factor: 1000 },
      tonne: { label: "Tonne", symbol: "t", factor: 1000000 },
      pound: { label: "Pound", symbol: "lb", factor: 453.592 },
    },
  },
  {
    id: "temperature",
    label: "Temperature",
    icon: Thermometer,
    base: "celsius",
    units: {
      celsius: { label: "Celsius", symbol: "°C" },
      fahrenheit: { label: "Fahrenheit", symbol: "°F" },
      kelvin: { label: "Kelvin", symbol: "K" },
    },
  },
  {
    id: "time",
    label: "Time",
    icon: Clock,
    base: "second",
    units: {
      second: { label: "Second", symbol: "s", factor: 1 },
      minute: { label: "Minute", symbol: "min", factor: 60 },
      hour: { label: "Hour", symbol: "hr", factor: 3600 },
      day: { label: "Day", symbol: "day", factor: 86400 },
    },
  },
  {
    id: "volume",
    label: "Volume",
    icon: Droplets,
    base: "L",
    units: {
      mL: { label: "Millilitre", symbol: "mL", factor: 0.001 },
      L: { label: "Litre", symbol: "L", factor: 1 },
      gallon: { label: "Gallon (US)", symbol: "gal", factor: 3.78541 },
    },
  },
  {
    id: "area",
    label: "Area",
    icon: Square,
    base: "m2",
    units: {
      m2: { label: "Square Metre", symbol: "m²", factor: 1 },
      km2: { label: "Square Kilometre", symbol: "km²", factor: 1000000 },
      acre: { label: "Acre", symbol: "acre", factor: 4046.86 },
    },
  },
];

export const getCategory = (id) => categories.find((c) => c.id === id);
