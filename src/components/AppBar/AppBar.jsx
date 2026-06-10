import { useAI } from '../../hooks/useAI';
import { useStore } from '../../store/useStore';
import s from './AppBar.module.css';

export default function AppBar({ onToggleSidebar, onToggleAI }) {
  const openModal = useStore(st => st.openModal);
  const { optimize, loading } = useAI();

  return (
    <header className={s.bar}>
      <button className={s.iconBtn} onClick={onToggleSidebar} aria-label="Меню">
        <i className="ti ti-menu-2" />
      </button>

      <div className={s.logo}>
        <i className="ti ti-sparkles" />
        TaskAI
      </div>

      <div className={s.spacer} />

      <button className={s.btn} onClick={openModal}>
        <i className="ti ti-plus" /> <span className={s.btnLabel}>Завдання</span>
      </button>
      <button className={s.btnPrimary} onClick={optimize} disabled={loading}>
        <i className="ti ti-sparkles" /> <span className={s.btnLabel}>AI-оптимізація</span>
      </button>
      <button className={s.iconBtn} onClick={onToggleAI} aria-label="AI-асистент">
        <i className="ti ti-message-chatbot" />
      </button>
    </header>
  );
}
