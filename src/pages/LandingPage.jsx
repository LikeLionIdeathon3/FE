import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <Logo size="lg" />
      <h1>내가 먹는 영양제,<br />진짜인가요?</h1>
      <p className="landing-desc">식약처 데이터로 즉시 판별합니다</p>
      <button className="landing-cta" onClick={() => navigate('/home')}>
        시작하기
      </button>
    </div>
  );
}
