import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo';

const features = [
  '식약처 품목 판별',
  '성분표 OCR 스캔',
  '위해·회수 실시간 알림',
  '성분명 난독화 탐지',
  '식약처 출처 명시',
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <Logo size="lg" />

      <div className="landing-badge">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        식약처 공공데이터 API 연동
      </div>

      <h1>
        내가 먹는 영양제,<br />
        진짜인가요? <em>가짜인가요?</em>
      </h1>

      <p className="landing-desc">
        성분표 한 장으로 건강기능식품 여부부터<br />
        위해·회수 정보까지 즉시 판별합니다.
      </p>

      <div className="landing-features">
        {features.map((f) => (
          <div key={f} className="feat-pill">
            <span className="feat-dot" />
            {f}
          </div>
        ))}
      </div>

      <button className="landing-cta" onClick={() => navigate('/home')}>
        시작하기
      </button>
    </div>
  );
}
