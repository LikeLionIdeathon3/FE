import { useNavigate } from 'react-router-dom';

const tabs = [
  { label: '홈',     path: '/home',    icon: '/src/assets/icons/home.svg' },
  { label: '검색',  path: '/home',    icon: '/src/assets/icons/search.svg' },
  { label: '알림',  path: '/recall',  icon: '/src/assets/icons/bell.svg' },
  { label: '내 정보', path: '/profile', icon: '/src/assets/icons/user.svg' },
];

export default function TabBar({ active }) {
  const navigate = useNavigate();

  return (
    <div className="tabbar">
      {tabs.map((t) => {
        const isActive = active === t.label;
        return (
          <button
            key={t.label}
            className={`tab${isActive ? ' on' : ''}`}
            onClick={() => navigate(t.path)}
          >
            <img
              src={t.icon}
              width="18"
              height="18"
              className={`icon ${isActive ? 'icon-teal' : 'icon-gray'}`}
              alt=""
            />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
