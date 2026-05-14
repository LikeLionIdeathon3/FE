import { useNavigate } from 'react-router-dom';
import { homeIcon, searchIcon, bellIcon, userIcon } from '../assets/icons';

const tabs = [
  { label: '홈',      path: '/home',    icon: homeIcon },
  { label: '검색',   path: '/home',    icon: searchIcon },
  { label: '알림',   path: '/recall',  icon: bellIcon },
  { label: '내 정보', path: '/profile', icon: userIcon },
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
