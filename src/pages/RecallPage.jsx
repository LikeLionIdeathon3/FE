import { useNavigate } from 'react-router-dom';
import TabBar from '../components/TabBar';
import { arrowLeftIcon, shieldIcon, alertIcon } from '../assets/icons';

const recentRecalls = [
  { name: '△△ 해외직구 오메가3', sub: '해외직구 위해식품 · I-0060', badge: 'b-danger', label: '위해' },
  { name: '○○ 다이어트 부스터', sub: '식품 부적합 · I-0120', badge: 'b-warn', label: '부적합' },
  { name: '□□ 프리미엄 아연', sub: '회수판매중지 · I-0030', badge: 'b-danger', label: '회수' },
];

export default function RecallPage() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      {/* 헤더 */}
      <div className="app-hdr">
        <button className="hdr-back" onClick={() => navigate('/home')}>
          <img src={arrowLeftIcon} width="20" height="20"
            className="icon icon-ink2" alt="뒤로가기" />
        </button>
        <span className="hdr-title">회수·위해 정보</span>
        <div className="hdr-placeholder" />
      </div>

      {/* 바디 */}
      <div className="app-body">
        {/* 주요 회수 카드 */}
        <div className="recall-card">
          <div className="recall-title">
            <img src={shieldIcon} width="15" height="15"
              className="icon icon-red" alt="" />
            회수 조치 제품
          </div>
          <div className="prod-name">□□ 멀티비타민 골드</div>
          <hr className="info-divider" style={{ borderColor: '#FECDCA', margin: '9px 0' }} />
          <div className="info-row">
            <span className="info-key">회수 사유</span>
            <span className="info-val-danger">위해 성분 검출</span>
          </div>
          <div className="info-row">
            <span className="info-key">회수 일자</span>
            <span className="info-val-danger">2025.04.12</span>
          </div>
          <div className="info-row">
            <span className="info-key">처리 기관</span>
            <span className="info-val">식품의약품안전처</span>
          </div>
          <p style={{ fontSize: 10, color: '#912018', lineHeight: 1.6, marginTop: 9, fontWeight: 700 }}>
            이 제품은 위해 성분이 발견되어 회수 조치된 제품입니다. 즉시 섭취를 중단하세요.
          </p>
          <div className="source-tag">출처: 식약처 회수판매중지 DB (I-0030)</div>
        </div>

        {/* 최근 회수 목록 */}
        <div className="sec">최근 회수 목록</div>
        {recentRecalls.map((item) => (
          <div key={item.name} className="li">
            <div>
              <div className="li-name">{item.name}</div>
              <div className="li-sub">{item.sub}</div>
            </div>
            <span className={`badge ${item.badge}`}>{item.label}</span>
          </div>
        ))}

        <button className="ghost-btn">식약처 전체 회수 목록 보기 →</button>

        <div className="alert-card alert-warn">
          <div className="alert-title">
            <img src={alertIcon} width="13" height="13"
              className="icon icon-amber" alt="" />
            안내
          </div>
          <div className="alert-body">
            회수·위해 정보는 식품의약품안전처 공공 데이터를 기반으로 제공됩니다.
            최신 정보는 식약처 공식 사이트를 확인하세요.
          </div>
        </div>
      </div>

      <TabBar active="알림" />
    </div>
  );
}
