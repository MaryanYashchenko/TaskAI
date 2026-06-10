import { useStore } from '../../store/useStore';
import s from './Sidebar.module.css';

const VIEWS = [
  { key: 'board',     label: 'Дошка',    icon: 'ti-layout-kanban' },
  { key: 'list',      label: 'Список',   icon: 'ti-list' },
  { key: 'analytics', label: 'Аналітика',icon: 'ti-chart-bar' },
];

const FILTERS = [
  { key: 'all',  label: 'Всі завдання', icon: 'ti-filter',       iconStyle: {} },
  { key: 'high', label: 'Критичні',     icon: 'ti-point-filled', iconStyle: { color: '#E24B4A', fontSize: 14 } },
  { key: 'med',  label: 'Середні',      icon: 'ti-point-filled', iconStyle: { color: '#EF9F27', fontSize: 14 } },
  { key: 'low',  label: 'Низькі',       icon: 'ti-point-filled', iconStyle: { color: '#639922', fontSize: 14 } },
];

export default function Sidebar({ open, onClose }) {
  const view           = useStore(st => st.view);
  const filterPriority = useStore(st => st.filterPriority);
  const setView        = useStore(st => st.setView);
  const setFilter      = useStore(st => st.setFilterPriority);
  const tasks          = useStore(st => st.tasks);
  const countByP       = useStore(st => st.countByPriority);

  const total = tasks.length;

  function selectView(key) {
    setView(key);
    onClose?.();
  }

  function selectFilter(key) {
    setFilter(key);
    onClose?.();
  }

  const filterBadge = (key) => {
    if (key === 'all')  return <span className={s.badge}>{total}</span>;
    if (key === 'high') return <span className={s.badgeErr}>{countByP('high')}</span>;
    if (key === 'med')  return <span className={s.badgeWarn}>{countByP('med')}</span>;
    return <span className={s.badge}>{countByP('low')}</span>;
  };

  return (
    <aside className={`${s.sidebar} ${open ? s.sidebarOpen : ''}`}>
      <div className={s.header}>
        <div className={s.headerTitle}>
          <i className="ti ti-sparkles" /> TaskAI
        </div>
        <div className={s.headerSub}>AI-планувальник завдань</div>
        <button className={s.closeBtn} onClick={onClose} aria-label="Закрити меню">
          <i className="ti ti-x" />
        </button>
      </div>

      <div className={s.section}>
        <div className={s.sectionLabel}>Навігація</div>
        {VIEWS.map(v => (
          <button
            key={v.key}
            className={view === v.key ? s.navItemActive : s.navItem}
            onClick={() => selectView(v.key)}
          >
            <i className={`ti ${v.icon}`} />
            {v.label}
            {v.key === 'board' && <span className={s.badge}>{total}</span>}
          </button>
        ))}
      </div>

      <div className={s.divider} />

      <div className={s.section}>
        <div className={s.sectionLabel}>Фільтр пріоритетів</div>
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={filterPriority === f.key ? s.navItemActive : s.navItem}
            onClick={() => selectFilter(f.key)}
          >
            <i className={`ti ${f.icon}`} style={f.iconStyle} />
            {f.label}
            {filterBadge(f.key)}
          </button>
        ))}
      </div>

      <div className={s.divider} />

      <div className={s.section}>
        <div className={s.sectionLabel}>AI модель</div>
        <div className={s.modelCard}>
          <div className={s.modelName}>Groq · Llama 3.3 70B</div>
          <div className={s.modelSub}>Безкоштовно · Швидко</div>
          <div className={s.modelStatus}>
            <div className={s.dot} />
            Підключено
          </div>
        </div>
      </div>
    </aside>
  );
}
