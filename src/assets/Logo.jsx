import logoSrc from './logo.svg';

export default function Logo({ size = 'md' }) {
  const iconSize = size === 'lg' ? 56 : 40;
  const fontSize = size === 'lg' ? '36px' : '22px';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <img src={logoSrc} width={iconSize} height={iconSize} alt="" style={{ display: 'block' }} />
      <span style={{
        fontFamily: "'Syne', sans-serif",
        fontSize,
        fontWeight: 800,
        color: '#101828',
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
      }}>
        MO<span style={{ color: '#0D9488' }}>AS</span>
      </span>
    </div>
  );
}
