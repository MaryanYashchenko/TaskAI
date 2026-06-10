import { useFilteredTasks } from '../../hooks/useFilteredTasks';
import { STATUS_COLORS, STATUS_LABELS } from '../../lib/constants';
import s from './Analytics.module.css';

export default function Analytics() {
  const tasks = useFilteredTasks();
  const total = tasks.length;

  if (!total) {
    return (
      <div className={s.empty}>
        <i className="ti ti-chart-bar" />
        <p>Немає даних для цього фільтру</p>
      </div>
    );
  }

  const done   = tasks.filter(t => t.status === 'done').length;
  const inprog = tasks.filter(t => t.status === 'inprogress').length;
  const todo   = tasks.filter(t => t.status === 'todo').length;
  const high   = tasks.filter(t => t.priority === 'high').length;
  const avg    = (tasks.reduce((s, t) => s + t.score, 0) / total).toFixed(1);

  const cats = tasks.reduce((acc, t) => { acc[t.cat] = (acc[t.cat] || 0) + 1; return acc; }, {});
  const pct  = v => Math.round(v / total * 100);

  const statusRows = [
    { label: STATUS_LABELS.todo,       count: todo,   color: STATUS_COLORS.todo },
    { label: STATUS_LABELS.inprogress, count: inprog, color: STATUS_COLORS.inprogress },
    { label: STATUS_LABELS.done,       count: done,   color: STATUS_COLORS.done },
  ];

  return (
    <div>
      <div className={s.stats}>
        <StatCard label="Всього"   value={total}    sub="завдань" />
        <StatCard label="Виконано" value={done}     sub={`${pct(done)}%`} />
        <StatCard label="AI-Score" value={avg}      sub="середній" />
        <StatCard label="Критичні" value={high}     sub="потребують уваги" />
      </div>

      <div className={s.grid}>
        <div className={s.card}>
          <div className={s.cardTitle}>Статус завдань</div>
          {statusRows.map(r => (
            <BarRow key={r.label} label={r.label} count={r.count} pct={pct(r.count)} color={r.color} />
          ))}
        </div>

        <div className={s.card}>
          <div className={s.cardTitle}>По категоріях</div>
          {Object.entries(cats).map(([cat, cnt]) => (
            <BarRow key={cat} label={cat} count={cnt} pct={pct(cnt)} color="var(--c-accent)" />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className={s.statCard}>
      <div className={s.statLabel}>{label}</div>
      <div className={s.statValue}>{value}</div>
      <div className={s.statSub}>{sub}</div>
    </div>
  );
}

function BarRow({ label, count, pct, color }) {
  return (
    <div className={s.barRow}>
      <span className={s.barLabel}>{label}</span>
      <span className={s.barCount}>{count}</span>
      <div className={s.barWrap}>
        <div className={s.barTrack}>
          <div className={s.barFill} style={{ width: `${pct}%`, background: color }} />
        </div>
      </div>
    </div>
  );
}
