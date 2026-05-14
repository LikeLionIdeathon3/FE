import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo';
import TabBar from '../components/TabBar';

const STORAGE_KEY = 'genupill_profile';

const pregnancyOptions = [
  '해당 없음',
  '임신 준비 중',
  '임신 중',
  '수유 중',
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: '',
    gender: '',
    age: '',
    pregnancy: '해당 없음',
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setForm(JSON.parse(stored)); } catch (_) {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

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
        </div>
      </div>

      {/* 바디 */}
      <div className="app-body">
        <div className="sec">내 프로필</div>

        {saved && (
          <div className="save-success">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            저장되었습니다
          </div>
        )}

        {/* 이름 */}
        <div className="info-card" style={{ gap: 10, display: 'flex', flexDirection: 'column' }}>
          <div className="profile-section">
            <div className="profile-label">이름</div>
            <input
              className="profile-input"
              type="text"
              placeholder="이름을 입력하세요"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
            />
          </div>

          {/* 성별 */}
          <div className="profile-section">
            <div className="profile-label">성별</div>
            <div className="toggle-group">
              {['남', '여'].map((g) => (
                <button
                  key={g}
                  className={`toggle-btn${form.gender === g ? ' active' : ''}`}
                  onClick={() => set('gender', g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* 나이 */}
          <div className="profile-section">
            <div className="profile-label">나이</div>
            <input
              className="profile-input"
              type="number"
              placeholder="나이를 입력하세요"
              min="1"
              max="120"
              value={form.age}
              onChange={(e) => set('age', e.target.value)}
            />
          </div>

          {/* 임신 가능성 — 여성 또는 미선택일 때만 표시 */}
          {form.gender === '여' && (
            <div className="profile-section">
              <div className="profile-label">임신 가능성</div>
              <div className="option-group">
                {pregnancyOptions.map((opt) => (
                  <button
                    key={opt}
                    className={`option-btn${form.pregnancy === opt ? ' active' : ''}`}
                    onClick={() => set('pregnancy', opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 안내 */}
        <div className="alert-card alert-ok">
          <div className="alert-title">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            맞춤 위해 경고
          </div>
          <div className="alert-body">
            프로필 정보를 입력하면 임신·수유 중 주의 성분,
            연령별 권장량 초과 여부 등을 맞춤형으로 알려드립니다.
          </div>
        </div>

        <button className="primary-btn" onClick={handleSave}>
          저장하기
        </button>
      </div>

      <TabBar active="내 정보" />
    </div>
  );
}
