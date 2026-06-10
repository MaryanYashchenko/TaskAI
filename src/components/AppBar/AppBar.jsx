import { useAI } from '../../hooks/useAI';
import { useStore } from '../../store/useStore';
import s from './AppBar.module.css';

export default function AppBar() {
  const openModal = useStore(st => st.openModal);
  const { optimize, loading } = useAI();

  return (
    <header className={s.bar}>
      <div className={s.logo}>
        <i className="ti ti-sparkles" />
        TaskAI
      </div>

      <div className={s.spacer} />

      <button className={s.btn} onClick={openModal}>
        <i className="ti ti-plus" /> Завдання
      </button>
      <button className={s.btnPrimary} onClick={optimize} disabled={loading}>
        <i className="ti ti-sparkles" /> AI-оптимізація
      </button>
    </header>
  );
}
