import {
  PRIORITY_LABELS,
  STATUS_COLUMNS,
  STATUS_COLORS,
  STATUS_PROGRESS,
  formatDue,
} from '../../lib/constants';
import s from './TaskCard.module.css';

const TAG_CLASS = { high: s.tagHigh, med: s.tagMed, low: s.tagLow };

export default function TaskCard({ task, onDragStart, onMoveStatus }) {
  const statusIdx = STATUS_COLUMNS.indexOf(task.status);
  const canPrev = statusIdx > 0;
  const canNext = statusIdx < STATUS_COLUMNS.length - 1;

  function movePrev(e) {
    e.stopPropagation();
    if (canPrev) onMoveStatus(task.id, STATUS_COLUMNS[statusIdx - 1]);
  }

  function moveNext(e) {
    e.stopPropagation();
    if (canNext) onMoveStatus(task.id, STATUS_COLUMNS[statusIdx + 1]);
  }

  return (
    <div
      className={s.card}
      draggable
      onDragStart={e => onDragStart(e, task.id)}
    >
      <div className={s.title}>{task.title}</div>
      {task.desc && <div className={s.desc}>{task.desc}</div>}

      <div className={s.tags}>
        <span className={TAG_CLASS[task.priority]}>{PRIORITY_LABELS[task.priority]}</span>
        <span className={s.tagCat}>{task.cat}</span>
      </div>

      <div className={s.footer}>
        <span className={s.score}>
          <i className="ti ti-sparkles" style={{ fontSize: 11 }} />
          {task.score.toFixed(1)}
        </span>
        <span className={s.due}>{formatDue(task.due)}</span>
      </div>

      <div className={s.progressBar}>
        <div
          className={s.progressFill}
          style={{
            width:      `${STATUS_PROGRESS[task.status]}%`,
            background: STATUS_COLORS[task.status],
          }}
        />
      </div>

      <div className={s.statusNav}>
        <button
          type="button"
          className={s.statusBtn}
          disabled={!canPrev}
          onClick={movePrev}
          title="Попередній етап"
        >
          <i className="ti ti-chevron-left" />
        </button>
        <button
          type="button"
          className={s.statusBtn}
          disabled={!canNext}
          onClick={moveNext}
          title="Наступний етап"
        >
          <i className="ti ti-chevron-right" />
        </button>
      </div>
    </div>
  );
}
