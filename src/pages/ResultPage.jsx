import { useLocation, useNavigate } from 'react-router-dom';
import TabBar from '../components/TabBar';

function getStatus(data) {
  if (!data || data.notFound) return 'notfound';
  if (data.isHealthFood === true) return 'ok';
  if (data.isHealthFood === false) return 'danger';
  return 'warn';
}

const statusConfig = {
  ok: {
    badgeClass: 'b-ok', cardClass: 'alert-ok', label: '정식 등록',
    textColor: 'var(--teal-dark)', dividerColor: '#99F6E4',
    isHealthFoodLabel: '예', valClass: 'info-val',
  },
  danger: {
    badgeClass: 'b-danger', cardClass: 'alert-danger', label: '주의',
    textColor: '#912018', dividerColor: '#FECDCA',
    isHealthFoodLabel: '아님', valClass: 'info-val-danger',
  },
  warn: {
    badgeClass: 'b-warn', cardClass: 'alert-warn', label: '확인 필요',
    textColor: '#93370D', dividerColor: '#FEDF89',
    isHealthFoodLabel: '정보 없음', valClass: 'info-val',
  },
  notfound: {
    badgeClass: 'b-gray', cardClass: 'alert-warn', label: '미확인',
    textColor: '#93370D', dividerColor: '#FEDF89',
    isHealthFoodLabel: '-', valClass: 'info-val',
  },
};

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, query } = location.state || {};

  if (!data && !query) {
    navigate('/home');
    return null;
  }

  const status = getStatus(data);
  const cfg = statusConfig[status];

  const productName = data?.productName || query || '알 수 없음';
  const brand = data?.brand;
  const category = data?.category || '-';
  const subCategory = data?.subCategory;
  const approvedFunction = data?.approvedFunction || '없음';
  const warning = data?.warning;
  const source = data?.source || '식약처 DB';
  const checkedAt = data?.checkedAt ? data.checkedAt.slice(0, 10).replace(/-/g, '.') : '-';

  return (
    <div className="screen">
      {/* 헤더 */}
      <div className="app-hdr">
        <button className="hdr-back" onClick={() => navigate(-1)}>
          <img src="/src/assets/icons/arrow-left.svg" width="20" height="20"
            className="icon icon-ink2" alt="뒤로가기" />
        </button>
        <span className="hdr-title">판별 결과</span>
        <div className="hdr-placeholder" />
      </div>

      {/* 바디 */}
      <div className="app-body">
        {/* 메인 결과 카드 */}
        <div className={`alert-card ${cfg.cardClass}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div className="prod-name">{productName}</div>
              {brand && (
                <div style={{ fontSize: 10, color: cfg.textColor }}>브랜드명 {brand}</div>
              )}
            </div>
            <span className={`badge ${cfg.badgeClass}`}>{cfg.label}</span>
          </div>

          <hr className="info-divider" style={{ borderColor: cfg.dividerColor }} />

          <div className="info-row">
            <span className="info-key">식약처 등록 품목군</span>
            <span className={status === 'ok' ? 'info-val' : 'info-val-danger'}>
              {category}{subCategory ? ` (${subCategory})` : ''}
            </span>
          </div>
          <div className="info-row">
            <span className="info-key">건강기능식품 여부</span>
            <span className={cfg.valClass}>{cfg.isHealthFoodLabel}</span>
          </div>
          <div className="info-row">
            <span className="info-key">식약처 인정 기능성</span>
            <span className={approvedFunction === '없음' ? 'info-val-danger' : 'info-val'}>
              {approvedFunction}
            </span>
          </div>

          {status === 'danger' && (
            <p style={{ fontSize: 10, color: cfg.textColor, lineHeight: 1.6, marginTop: 8 }}>
              식약처 가이드라인에 따르면 이 제품은 건강기능식품이 아닌{' '}
              <strong>{category}{subCategory ? ` (${subCategory})` : ''}</strong>으로 분류되어 있습니다.
              최종 판단은 전문가에게 문의하세요.
            </p>
          )}
          {status === 'notfound' && (
            <p style={{ fontSize: 10, color: cfg.textColor, lineHeight: 1.6, marginTop: 8 }}>
              식약처 데이터베이스에서 해당 제품을 찾을 수 없습니다.
              제품명을 다시 확인하거나 식약처 공식 사이트에서 검색해 주세요.
            </p>
          )}

          <div className="source-tag">출처: {source} · 확인일 {checkedAt}</div>
        </div>

        {/* 주의사항 */}
        {warning && (
          <div className="alert-card alert-warn">
            <div className="alert-title">
              <img src="/src/assets/icons/alert.svg" width="13" height="13"
                className="icon icon-amber" alt="" />
              주의사항
            </div>
            <div className="alert-body">{warning}</div>
          </div>
        )}

        {/* 제품 정보 */}
        {status !== 'notfound' && (
          <>
            <div className="sec">제품 정보</div>
            <div className="info-card">
              <div className="info-row">
                <span className="info-key">제품명</span>
                <span className="info-val">{productName}</span>
              </div>
              {brand && (
                <>
                  <hr className="info-divider" />
                  <div className="info-row">
                    <span className="info-key">브랜드</span>
                    <span className="info-val">{brand}</span>
                  </div>
                </>
              )}
              {category !== '-' && (
                <>
                  <hr className="info-divider" />
                  <div className="info-row">
                    <span className="info-key">카테고리</span>
                    <span className="info-val">{category}</span>
                  </div>
                </>
              )}
              <hr className="info-divider" />
              <div className="info-row">
                <span className="info-key">식약처 인정 기능성</span>
                <span className={approvedFunction === '없음' ? 'info-val-danger' : 'info-val'}>
                  {approvedFunction}
                </span>
              </div>
            </div>
          </>
        )}

        <button className="ghost-btn">식약처 공식 페이지에서 직접 확인 →</button>

        {status === 'danger' && (
          <div className="alert-card alert-ok">
            <div className="alert-title">이런 제품을 찾으셨나요?</div>
            <div className="alert-body">
              정식 건강기능식품은 제품 포장에 식약처 건강기능식품 인증 마크가 있습니다.
            </div>
          </div>
        )}
      </div>

      <TabBar active="검색" />
    </div>
  );
}
