import logoSrc from './logo.svg';

export default function Logo({ size = 'md' }) {
  const iconSize = size === 'lg' ? 48 : 36;
  const fontSize = size === 'lg' ? '26px' : '18px';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <img src={logoSrc} width={iconSize} height={iconSize} alt="" />
      <span style={{
        fontFamily: "'Syne', sans-serif",
        fontSize,
        fontWeight: 800,
        color: '#101828',
        lineHeight: 1,
      }}>
        Genu<span style={{ color: '#0D9488' }}>Pill</span>
      </span>
    </div>
  );
}
