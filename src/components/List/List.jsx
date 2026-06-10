import { useFilteredTasks } from '../../hooks/useFilteredTasks';
import { PRIORITY_LABELS, formatDue } from '../../lib/constants';
import s from './List.module.css';

export default function List() {
  const filteredTasks = useFilteredTasks();
  const sorted = [...filteredTasks].sort((a, b) => b.score - a.score);

  const TAG = { high: s.tagHigh, med: s.tagMed, low: s.tagLow };

  if (!sorted.length) {
    return (
      <div className={s.empty}>
        <i className="ti ti-inbox" />
        <p>Немає завдань для цього фільтру</p>
      </div>
    );
  }

  return (
    <div className={s.wrap}>
      {sorted.map((task, i) => (
        <div key={task.id} className={s.card}>
          <span className={s.rank}>{i + 1}</span>
          <div className={s.info}>
            <div className={s.title}>{task.title}</div>
            <div className={s.tags}>
              <span className={TAG[task.priority]}>{PRIORITY_LABELS[task.priority]}</span>
              <span className={s.tagCat}>{task.cat}</span>
              {task.due && (
                <span className={s.due}>{formatDue(task.due)}</span>
              )}
            </div>
          </div>
          <span className={s.score}>
            <i className="ti ti-sparkles" /> {task.score.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}
