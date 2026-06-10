import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CATEGORIES } from '../../lib/constants';
import s from './TaskModal.module.css';

const defaultDue = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split('T')[0];
};

const INITIAL = { title: '', desc: '', priority: 'med', cat: 'Backend', due: defaultDue() };

export default function TaskModal() {
  const modalOpen  = useStore(st => st.modalOpen);
  const closeModal = useStore(st => st.closeModal);
  const addTask    = useStore(st => st.addTask);
  const addMessage = useStore(st => st.addMessage);

  const [form, setForm] = useState(INITIAL);

  if (!modalOpen) return null;

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function handleSubmit() {
    if (!form.title.trim()) return;
    const task = addTask({ ...form, title: form.title.trim() });
    addMessage({ role: 'ai', text: `Завдання "${task.title}" додано з AI-score ${task.score.toFixed(1)}.` });
    setForm({ ...INITIAL, due: defaultDue() });
    closeModal();
  }

  function handleOverlay(e) {
    if (e.target === e.currentTarget) closeModal();
  }

  return (
    <div className={s.overlay} onClick={handleOverlay}>
      <div className={s.modal}>
        <div className={s.title}>
          <i className="ti ti-plus" style={{ fontSize: 14, marginRight: 6 }} />
          Нове завдання
        </div>

        <div className={s.field}>
          <label>Назва</label>
          <input
            className={s.input}
            placeholder="Введіть назву..."
            value={form.title}
            onChange={e => set('title', e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
        </div>

        <div className={s.field}>
          <label>Опис</label>
          <textarea
            className={s.textarea}
            placeholder="Деталі..."
            value={form.desc}
            onChange={e => set('desc', e.target.value)}
          />
        </div>

        <div className={s.grid}>
          <div className={s.field}>
            <label>Пріоритет</label>
            <select className={s.select} value={form.priority} onChange={e => set('priority', e.target.value)}>
              <option value="high">Критичний</option>
              <option value="med">Середній</option>
              <option value="low">Низький</option>
            </select>
          </div>
          <div className={s.field}>
            <label>Категорія</label>
            <select className={s.select} value={form.cat} onChange={e => set('cat', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className={s.field}>
          <label>Дедлайн</label>
          <input
            type="date"
            className={s.input}
            value={form.due}
            onChange={e => set('due', e.target.value)}
          />
        </div>

        <div className={s.actions}>
          <button className={s.btn} onClick={closeModal}>Скасувати</button>
          <button className={s.btnPrimary} onClick={handleSubmit}>
            <i className="ti ti-check" /> Додати
          </button>
        </div>
      </div>
    </div>
  );
}
