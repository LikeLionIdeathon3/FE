import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo';
import TabBar from '../components/TabBar';
import { searchProduct, saveRecentSearch, getRecentSearches } from '../services/productSearch';

function toBadge(data) {
  if (!data || data.notFound) return { badge: 'b-gray', label: '미확인' };
  if (data.isHealthFood === true)  return { badge: 'b-ok',     label: '정식 등록' };
  return { badge: 'b-danger', label: '주의' };
}

function toSub(data) {
  if (!data || data.notFound) return '검색 결과 없음';
  const parts = [data.category, data.subCategory].filter(Boolean);
  return parts.join(' · ') || '-';
}

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recents, setRecents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRecents(getRecentSearches());
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setError(null);
    setLoading(true);
    try {
      const json = await searchProduct(query.trim());
      const updated = saveRecentSearch(query.trim(), json.data);
      setRecents(updated);
      navigate('/result', { state: { data: json.data, query: query.trim() } });
    } catch (err) {
      setError(err.message || '검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecentClick = (item) => {
    navigate('/result', { state: { data: item.data, query: item.query } });
  };

  return (
    <div className="screen">
      {/* 헤더 */}
      <div className="app-hdr">
        <Logo />
        <div className="hdr-icons">
          <div className="hdr-icon" onClick={() => navigate('/recall')}>
            <img src="/src/assets/icons/bell.svg" width="15" height="15"
              className="icon icon-gray" alt="알림" />
          </div>
          <div className="hdr-icon" onClick={() => navigate('/profile')}>
            <img src="/src/assets/icons/user.svg" width="15" height="15"
              className="icon icon-gray" alt="내 정보" />
          </div>
        </div>
      </div>

      {/* 바디 */}
      <div className="app-body">
        {/* 검색 */}
        <form onSubmit={handleSearch}>
          <div className="search-bar">
            <img src="/src/assets/icons/search.svg" width="15" height="15"
              className="icon icon-teal" alt="" />
            <input
              type="text"
              placeholder="제품명 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            {loading ? (
              <div className="spinner"
                style={{ borderTopColor: 'var(--teal)', borderColor: 'var(--border)', width: 16, height: 16 }} />
            ) : (
              <button type="submit" className="search-btn" disabled={!query.trim()}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke={query.trim() ? 'var(--teal)' : 'var(--ink4)'}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
        </form>

        {error && (
          <div className="alert-card alert-danger">
            <div className="alert-title">오류</div>
            <div className="alert-body">{error}</div>
          </div>
        )}

        {/* 빠른 실행 */}
        <div className="sec">빠른 실행</div>
        <div className="g2">
          <div className="qb" onClick={() => navigate('/scan')}>
            <img src="/src/assets/icons/camera.svg" width="24" height="24"
              className="icon icon-teal" alt="" />
            <p>성분표 스캔</p>
          </div>
          <div className="qb" onClick={() => navigate('/barcode')}>
            <img src="/src/assets/icons/barcode.svg" width="24" height="24"
              className="icon icon-teal" alt="" />
            <p>바코드 스캔</p>
          </div>
          <div className="qb" onClick={() => navigate('/recall')}>
            <img src="/src/assets/icons/alert.svg" width="24" height="24"
              className="icon icon-amber" alt="" />
            <p>회수 알림</p>
          </div>
          <div className="qb" onClick={() => navigate('/profile')}>
            <img src="/src/assets/icons/user.svg" width="24" height="24"
              className="icon icon-blue" alt="" />
            <p>내 프로필</p>
          </div>
        </div>

        {/* 최근 검색 */}
        <div className="sec">최근 검색</div>

        {recents.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '20px 0',
            fontSize: 12,
            color: 'var(--ink4)',
          }}>
            검색 기록이 없습니다
          </div>
        ) : (
          recents.map((item) => {
            const { badge, label } = toBadge(item.data);
            return (
              <div
                key={item.searchedAt}
                className="li"
                style={{ cursor: 'pointer' }}
                onClick={() => handleRecentClick(item)}
              >
                <div>
                  <div className="li-name">
                    {item.data?.productName || item.query}
                  </div>
                  <div className="li-sub">{toSub(item.data)}</div>
                </div>
                <span className={`badge ${badge}`}>{label}</span>
              </div>
            );
          })
        )}
      </div>

      <TabBar active="홈" />
    </div>
  );
}
