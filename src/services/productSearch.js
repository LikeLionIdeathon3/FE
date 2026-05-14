// ─────────────────────────────────────────────
// API 연동 전환 플래그
// true  → 목업 데이터 사용 (현재)
// false → 실제 POST /api/product/search 호출
// ─────────────────────────────────────────────
const USE_MOCK = true;

// ── 목업 데이터베이스 ──────────────────────────
const MOCK_DB = [
  {
    keywords: ['콜라겐', '콜라겐 젤리', '마린 콜라겐'],
    data: {
      productName: '마린 콜라겐 뷰티 젤리',
      brand: '내츄럴팜',
      category: '기타가공품',
      subCategory: '캔디류',
      isHealthFood: false,
      approvedFunction: '없음',
      warning:
        '이 제품은 건강기능식품이 아닌 일반 가공식품입니다. 식약처는 콜라겐 성분의 피부 개선 기능성을 공식 인정하지 않습니다.',
      source: '식약처 품목제조 DB',
      checkedAt: '2025-05-01T00:00:00',
      notFound: false,
    },
  },
  {
    keywords: ['비타민c', '비타민 c', '비타민씨', '비타민c 1000', '비타민c1000'],
    data: {
      productName: '비타민C 1000 에스터',
      brand: '한빛건강',
      category: '건강기능식품',
      subCategory: '비타민 및 무기질',
      isHealthFood: true,
      approvedFunction:
        '비타민C는 결합조직 형성과 기능 유지에 필요하며, 철의 흡수에 기여하고 항산화 작용에 도움을 줄 수 있습니다.',
      warning: null,
      source: '식약처 건강기능식품 DB',
      checkedAt: '2025-05-01T00:00:00',
      notFound: false,
    },
  },
  {
    keywords: ['멀티비타민', '멀티 비타민'],
    data: {
      productName: '프리미엄 멀티비타민 포르테',
      brand: '글로벌뉴트리',
      category: '건강기능식품',
      subCategory: '복합영양소',
      isHealthFood: false,
      approvedFunction: '없음',
      warning:
        '이 제품은 위해 성분 검출로 식약처 회수 조치된 제품입니다. 즉시 섭취를 중단하고 구매처에 반품하세요.',
      source: '식약처 회수판매중지 DB',
      checkedAt: '2025-04-12T00:00:00',
      notFound: false,
    },
  },
  {
    keywords: ['오메가3', '오메가 3', '오메가-3'],
    data: {
      productName: '알티지 오메가3 트리플',
      brand: '뉴트리바이오',
      category: '건강기능식품',
      subCategory: '지방산',
      isHealthFood: true,
      approvedFunction:
        'EPA 및 DHA 함유 유지는 혈중 중성지질 개선 및 혈행 개선에 도움을 줄 수 있습니다.',
      warning: null,
      source: '식약처 건강기능식품 DB',
      checkedAt: '2025-05-01T00:00:00',
      notFound: false,
    },
  },
  {
    keywords: ['유산균', '프로바이오틱스'],
    data: {
      productName: '장 건강 프로바이오틱스 200억',
      brand: '바이오팜',
      category: '건강기능식품',
      subCategory: '프로바이오틱스',
      isHealthFood: true,
      approvedFunction:
        '프로바이오틱스는 장내 유익균 증식 및 유해균 억제, 배변활동 원활에 도움을 줄 수 있습니다.',
      warning: null,
      source: '식약처 건강기능식품 DB',
      checkedAt: '2025-05-01T00:00:00',
      notFound: false,
    },
  },
];

const NOT_FOUND_RESPONSE = {
  productName: null,
  brand: null,
  category: null,
  subCategory: null,
  isHealthFood: null,
  approvedFunction: null,
  warning: null,
  source: '식약처 DB',
  checkedAt: new Date().toISOString(),
  notFound: true,
};

function mockSearch(query) {
  const q = query.trim().toLowerCase();
  const match = MOCK_DB.find((entry) =>
    entry.keywords.some((kw) => q.includes(kw) || kw.includes(q))
  );
  return {
    success: true,
    data: match ? match.data : NOT_FOUND_RESPONSE,
  };
}

// ── 최근 검색 기록 (localStorage) ─────────────
const RECENT_KEY = 'genupill_recent_searches';
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
  // 동일 검색어 중복 제거 후 맨 앞에 추가, 최대 5개 유지
  const next = [
    { query, data, searchedAt: new Date().toISOString() },
    ...prev.filter((item) => item.query.toLowerCase() !== query.toLowerCase()),
  ].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  return next;
}

// ── 공개 API ───────────────────────────────────
// 호출 방법: const result = await searchProduct('비타민C');
// result.data 가 ResultPage의 data prop과 동일한 구조
export async function searchProduct(query) {
  if (USE_MOCK) {
    // 네트워크 지연 시뮬레이션 (0.5초)
    await new Promise((r) => setTimeout(r, 500));
    return mockSearch(query);
  }

  // ── 실제 API 호출 (USE_MOCK = false 시 사용) ──
  const res = await fetch('/api/product/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(`서버 오류: ${res.status}`);
  return res.json();
}
