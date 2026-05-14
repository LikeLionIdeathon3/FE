import { useNavigate } from 'react-router-dom';
import TabBar from '../components/TabBar';
import { arrowLeftIcon, barcodeIcon } from '../assets/icons';

export default function BarcodePage() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      {/* 헤더 */}
      <div className="app-hdr">
        <button className="hdr-back" onClick={() => navigate('/home')}>
          <img src={arrowLeftIcon} width="20" height="20"
            className="icon icon-ink2" alt="뒤로가기" />
        </button>
        <span className="hdr-title">바코드 스캔</span>
        <div className="hdr-placeholder" />
      </div>

      {/* 바디 */}
      <div className="app-body" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        {/* 뷰파인더 */}
        <div className="camera-view" style={{ width: '100%', height: 220 }}>
          {/* 모서리 프레임 */}
          <div style={{
            position: 'absolute', inset: 20,
            borderRadius: 4,
          }}>
            {/* 네 모서리 */}
            {[
              { top: 0, left: 0, borderTop: '3px solid #0D9488', borderLeft: '3px solid #0D9488', borderRadius: '4px 0 0 0' },
              { top: 0, right: 0, borderTop: '3px solid #0D9488', borderRight: '3px solid #0D9488', borderRadius: '0 4px 0 0' },
              { bottom: 0, left: 0, borderBottom: '3px solid #0D9488', borderLeft: '3px solid #0D9488', borderRadius: '0 0 0 4px' },
              { bottom: 0, right: 0, borderBottom: '3px solid #0D9488', borderRight: '3px solid #0D9488', borderRadius: '0 0 4px 0' },
            ].map((style, i) => (
              <div key={i} style={{ position: 'absolute', width: 20, height: 20, ...style }} />
            ))}
          </div>

          {/* 스캔 라인 */}
          <div style={{
            position: 'absolute',
            left: 24, right: 24,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #0D9488, transparent)',
            top: '50%',
            animation: 'scanLine 1.8s ease-in-out infinite',
          }} />

          <img src={barcodeIcon} width="48" height="48"
            className="icon icon-teal" alt="" style={{ zIndex: 1, opacity: 0.5 }} />
        </div>

        <style>{`
          @keyframes scanLine {
            0%, 100% { top: 30%; }
            50% { top: 70%; }
          }
        `}</style>

        {/* 안내 문구 */}
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
          <span className="badge b-warn" style={{ fontSize: 11 }}>준비 중</span>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
            바코드 스캔 기능 준비 중입니다
          </p>
          <p style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.6, maxWidth: 260 }}>
            바코드 스캔으로 제품을 즉시 판별하는<br />
            기능이 곧 출시될 예정입니다.<br />
            지금은 제품명 검색을 이용해 주세요.
          </p>
        </div>

        <div style={{ marginTop: 28, width: '100%' }}>
          <button className="primary-btn" onClick={() => navigate('/home')}>
            제품명 검색하러 가기
          </button>
        </div>
      </div>

      <TabBar active="검색" />
    </div>
  );
}
