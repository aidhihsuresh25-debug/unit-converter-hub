const HISTORY_KEY = "converterhub_history";
const COUNT_KEY = "converterhub_count";
const THEME_KEY = "converterhub_theme";
const MAX_HISTORY = 10;

export function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function pushHistory(entry) {
  const current = loadHistory();
  const next = [entry, ...current].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  incrementCount();
  return next;
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  return [];
}

export function loadCount() {
  const raw = localStorage.getItem(COUNT_KEY);
  return raw ? parseInt(raw, 10) : 0;
}

function incrementCount() {
  const current = loadCount();
  localStorage.setItem(COUNT_KEY, String(current + 1));
}

export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
