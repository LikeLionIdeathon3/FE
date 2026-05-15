const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// ── 최근 검색 기록 (localStorage) ─────────────
const RECENT_KEY = 'moas_recent_searches';
const MAX_RECENT = 5;

export function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(query, data) {
  const prev = getRecentSearches();
  const next = [
    { query, data, searchedAt: new Date().toISOString() },
    ...prev.filter((item) => item.query.toLowerCase() !== query.toLowerCase()),
  ].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  return next;
}

// ── 공개 API ───────────────────────────────────
export async function searchProduct(query) {
  const res = await fetch(`${BASE_URL}/api/product/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error(`서버 오류: ${res.status}`);

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.error?.message || '검색에 실패했습니다.');
  }

  return json;
}
