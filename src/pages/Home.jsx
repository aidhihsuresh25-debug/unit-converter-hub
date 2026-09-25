import { useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, Copy, Check, RotateCcw, Activity } from "lucide-react";
import { getCategory } from "../data/units";
import { convertValue, trimNumber } from "../utils/convert";
import { loadCount, loadHistory, pushHistory } from "../utils/storage";

export default function Home({ categoryId }) {
  const category = getCategory(categoryId);
  const unitKeys = Object.keys(category.units);

  const [fromUnit, setFromUnit] = useState(unitKeys[0]);
  const [toUnit, setToUnit] = useState(unitKeys[1] || unitKeys[0]);
  const [inputValue, setInputValue] = useState("1");
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(loadCount());
  const [recent, setRecent] = useState(loadHistory().slice(0, 4));

  const { result, formula } = useMemo(
    () => convertValue(categoryId, fromUnit, toUnit, inputValue),
    [categoryId, fromUnit, toUnit, inputValue]
  );

  const resultText = result === null ? "—" : trimNumber(result);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleClear = () => {
    setInputValue("");
  };

  const handleCopy = async () => {
    if (result === null) return;
    try {
      await navigator.clipboard.writeText(String(resultText));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available — silently ignore for the college demo
    }
  };

  // record a conversion into localStorage once the user has a valid result
  useEffect(() => {
    if (result === null || inputValue === "") return;
    const timeout = setTimeout(() => {
      const entry = {
        id: Date.now(),
        category: categoryId,
        from: fromUnit,
        to: toUnit,
        input: inputValue,
        result: trimNumber(result),
        timestamp: new Date().toLocaleString(),
      };
      const next = pushHistory(entry);
      setRecent(next.slice(0, 4));
      setCount(loadCount());
    }, 600); // debounce so every keystroke doesn't spam history

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const Icon = category.icon;

  return (
    <div className="workspace">
      <div className="topbar">
        <div>
          <div className="page-title">{category.label} Converter</div>
          <div className="page-subtitle">
            Convert between {unitKeys.length} {category.label.toLowerCase()} units instantly.
          </div>
        </div>
        <div className="stat-pill">
          <Activity size={14} />
          Total conversions <strong>{count}</strong>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-label">
            <Icon size={14} /> Enter value
          </div>

          <input
            className="value-input"
            type="number"
            value={inputValue}
            placeholder="0"
            onChange={(e) => setInputValue(e.target.value)}
          />

          <div className="unit-row">
            <div className="unit-select-block">
              <label className="unit-select-label">From</label>
              <select
                className="unit-select"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {unitKeys.map((key) => (
                  <option key={key} value={key}>
                    {category.units[key].label} ({category.units[key].symbol})
                  </option>
                ))}
              </select>
            </div>

            <button className="swap-btn" onClick={handleSwap} title="Swap units">
              <ArrowLeftRight size={16} />
            </button>

            <div className="unit-select-block">
              <label className="unit-select-label">To</label>
              <select
                className="unit-select"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                {unitKeys.map((key) => (
                  <option key={key} value={key}>
                    {category.units[key].label} ({category.units[key].symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="result-readout">
            <div>
              <div className="result-value">{resultText}</div>
              <div className="result-unit">{category.units[toUnit].symbol}</div>
            </div>
            <button className="icon-btn" onClick={handleCopy} title="Copy result">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>

          <div className="formula-ticker">
            <span className="live-dot" />
            {formula || "Enter a value to see the formula"}
          </div>

          <div className="action-row">
            <button className="btn btn-ghost" onClick={handleClear}>
              <RotateCcw size={14} /> Clear
            </button>
          </div>
        </div>

        <div className="side-stack">
          <div className="card">
            <div className="card-label">
              <Activity size={14} /> Session stats
            </div>
            <div className="stat-number">{count}</div>
            <div className="stat-caption">conversions performed on this device</div>
          </div>

          <div className="card">
            <div className="card-label">Recent activity</div>
            {recent.length === 0 ? (
              <div className="empty-state">No conversions yet — try one above.</div>
            ) : (
              recent.map((item) => (
                <div className="mini-history-item" key={item.id}>
                  <span className="mini-history-eq">
                    {item.input} {item.from} → {item.result} {item.to}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
