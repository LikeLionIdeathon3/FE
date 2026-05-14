import { useNavigate } from 'react-router-dom';
import TabBar from '../components/TabBar';

const ingredients = [
  {
    name: '아연', nameEn: 'zinc',
    match: '아연 → 아연 (일치)', matchColor: 'var(--ink4)',
    amount: '10mg 함유 / 권장량 8.5mg',
    pct: 117, badgeClass: 'b-warn', barColor: '#F79009', barWidth: 100,
  },
  {
    name: '비타민C', nameEn: null,
    match: '아스코르브산 → 비타민C', matchColor: 'var(--teal)',
    amount: '60mg 함유 / 권장량 100mg',
    pct: 60, badgeClass: 'b-ok', barColor: 'var(--teal)', barWidth: 60,
  },
];

export default function ScanPage() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      {/* 헤더 */}
      <div className="app-hdr">
        <button className="hdr-back" onClick={() => navigate('/home')}>
          <img src="/src/assets/icons/arrow-left.svg" width="20" height="20"
            className="icon icon-ink2" alt="뒤로가기" />
        </button>
        <span className="hdr-title">성분 분석 결과</span>
        <span className="badge b-info">OCR 완료</span>
      </div>

      {/* 바디 */}
      <div className="app-body">
        {/* 카메라 뷰파인더 목업 */}
        <div className="camera-view">
          <img src="/src/assets/icons/camera.svg" width="36" height="36"
            className="icon icon-teal" alt="" style={{ zIndex: 1, opacity: 0.7 }} />
          <p>성분표를 카메라로 촬영하면<br />자동으로 분석됩니다</p>
        </div>

        {/* 성분 분석 결과 */}
        <div className="info-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>인식된 성분 · 3개</span>
            <span className="badge b-gray">○○ 종합비타민</span>
          </div>
          <hr className="info-divider" />

          {ingredients.map((ing) => (
            <div className="prog-item" key={ing.name}>
              <div className="prog-top">
                <div>
                  <div className="prog-name">
                    {ing.name}
                    {ing.nameEn && (
                      <span style={{ fontSize: 10, color: 'var(--ink4)' }}> ({ing.nameEn})</span>
                    )}
                  </div>
                  <div className="prog-sub" style={{ color: ing.matchColor }}>{ing.match}</div>
                </div>
                <span className={`badge ${ing.badgeClass}`}>{ing.pct}%</span>
              </div>
              <div className="prog-bar">
                <div className="prog-fill" style={{ width: `${ing.barWidth}%`, background: ing.barColor }} />
              </div>
              <div className="prog-meta">{ing.amount}</div>
            </div>
          ))}
        </div>

        {/* 미등록 성분 */}
        <div className="flag">
          <div className="flag-title">
            <img src="/src/assets/icons/flag.svg" width="13" height="13"
              className="icon icon-red" alt="" />
            미등록 성분 감지됨
          </div>
          <div className="flag-body">
            <strong>○○ 추출물</strong>은 국내 식약처에 등록되지 않은 성분입니다.
            식약처 가이드라인에 따르면 섭취에 주의가 필요합니다.
          </div>
          <div className="source-tag" style={{ marginTop: 6 }}>출처: 식약처 기능성 원료 DB</div>
        </div>

        {/* 권장량 초과 경고 */}
        <div className="alert-card alert-warn">
          <div className="alert-title">
            <img src="/src/assets/icons/alert.svg" width="13" height="13"
              className="icon icon-amber" alt="" />
            권장량 초과 성분 있음
          </div>
          <div className="alert-body">
            아연이 일일 권장량을 초과합니다. 식약처 가이드라인에 따르면 아연 과다 섭취 시
            구리 흡수 방해 등 부작용이 있을 수 있습니다.
          </div>
          <div className="source-tag">출처: 식약처 기능성 원료 정보 API</div>
        </div>
      </div>

      <TabBar active="검색" />
    </div>
  );
}
