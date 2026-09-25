import { useState } from "react";
import { Trash2, History as HistoryIcon } from "lucide-react";
import { clearHistory, loadHistory } from "../utils/storage";
import { getCategory } from "../data/units";

export default function History() {
  const [history, setHistory] = useState(loadHistory());

  const handleClear = () => {
    setHistory(clearHistory());
  };

  return (
    <div className="workspace">
      <div className="topbar">
        <div>
          <div className="page-title">Conversion History</div>
          <div className="page-subtitle">Your last {history.length} conversions, stored locally on this device.</div>
        </div>
        <button className="btn btn-ghost" onClick={handleClear}>
          <Trash2 size={14} /> Clear history
        </button>
      </div>

      <div className="card">
        {history.length === 0 ? (
          <div className="empty-state">
            <HistoryIcon size={20} style={{ marginBottom: 8 }} />
            <div>Nothing here yet. Run a conversion from the Converter page.</div>
          </div>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Conversion</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => {
                const category = getCategory(item.category);
                return (
                  <tr key={item.id}>
                    <td>
                      <span className="tag">{category?.label || item.category}</span>
                    </td>
                    <td className="eq-cell">
                      {item.input} {item.from} = {item.result} {item.to}
                    </td>
                    <td>{item.timestamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
